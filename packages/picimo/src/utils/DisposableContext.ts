import {Logger} from '.';

const log = new Logger('picimo.DisposableContext');

export type TDisposableContextKey = string | symbol;

export interface DisposableContextPropDef<TValue = unknown> {
  key: TDisposableContextKey;
  value?: TValue;
  default?: TValue;
  create?: (context: DisposableContext) => TValue;
  dispose?: (value: TValue, context: DisposableContext) => void;
}

const isValueKey = (key: any): key is TDisposableContextKey => {
  switch (typeof key) {
    case 'string':
    case 'symbol':
      return true;
    default:
      return false;
  }
};

export interface DisposableContextMetaInfo {
  serial: number;
  refCount: number;
}

const REF_COUNT_UNDEF = -1;

function copyOtherPropDefFields(
  from: DisposableContextPropDef,
  to: DisposableContextPropDef,
) {
  if (from.default != null) {
    to.default = from.default;
  }
  if (typeof from.create === 'function') {
    to.create = from.create;
  }
  if (typeof from.dispose === 'function') {
    to.dispose = from.dispose;
  }
}

const readKey = <TValue = unknown>(
  key: TDisposableContextKey | DisposableContextPropDef<TValue>,
): TDisposableContextKey => (isValueKey(key) ? key : key.key);

export class DisposableContext {
  #propDefs = new Map<TDisposableContextKey, DisposableContextPropDef>();
  #metaInfos = new WeakMap<
    DisposableContextPropDef,
    DisposableContextMetaInfo
  >();
  #refKeys = new Set<TDisposableContextKey>();

  serial = 1;

  set<TValue = unknown>(next: DisposableContextPropDef<TValue>): void {
    if (!this.#propDefs.has(next.key)) {
      // ----------------------------------------------------------------------
      // create
      // ----------------------------------------------------------------------
      const propDef: DisposableContextPropDef = {
        key: next.key,
      };
      propDef.value = next.value ?? undefined;
      copyOtherPropDefFields(next as DisposableContextPropDef, propDef);

      this.#propDefs.set(next.key, propDef);
      ++this.serial;

      if (log.VERBOSE) {
        log.log('set: created property definition:', propDef);
      }
    } else {
      // ----------------------------------------------------------------------
      // update
      // ----------------------------------------------------------------------
      const meta = this.#readMetaInfo(next as DisposableContextPropDef);
      const current = this.#propDefs.get(next.key);
      let serialsIncreased = false;
      if (
        current.value != null &&
        typeof next.create === 'function' &&
        current.create !== next.create
      ) {
        // ----------------------------------------------------------------------
        // + current value is defined
        // + create() is defined and changes
        // ----------------------------------------------------------------------
        if (current.dispose) {
          current.dispose(current.value, this);
        }
        current.value = undefined;

        ++meta.serial;
        ++this.serial;
        serialsIncreased = true;

        if (log.VERBOSE) {
          log.log('set: cleared previuos value because create() changed', {
            prop: next,
            meta,
          });
        }
      }
      if (next.value != null && next.value !== current.value) {
        // ----------------------------------------------------------------------
        // - value is defined
        // - value changes
        // ----------------------------------------------------------------------
        if (current.value != null) {
          if (current.dispose) {
            current.dispose(current.value, this);

            if (log.VERBOSE) {
              log.log(
                'set: disposed previous value because a new value was explicitly set',
                next,
              );
            }
          }
        }

        current.value = next.value ?? undefined;

        if (!serialsIncreased) {
          ++meta.serial;
          ++this.serial;
        }
      }
      copyOtherPropDefFields(next as DisposableContextPropDef, current);
    }
  }

  /**
   * Return a value.
   * If the value is not yet defined, try to generate a new value
   * by calling the corresponding create() function.
   *
   * Note: is the value is either *set* or *undefined* but never *null*!
   */
  get<TValue = unknown>(
    key: TDisposableContextKey | DisposableContextPropDef<TValue>,
  ): TValue | undefined {
    const prop = this.#propDefs.get(
      readKey(key),
    ) as DisposableContextPropDef<TValue>;
    if (prop) {
      if (prop.value != null) {
        return prop.value;
      }
      if (prop.create) {
        const value = prop.create(this);
        if (value != null) {
          prop.value = value;
          const meta = this.#findOrCreateMetaInfo(
            prop as DisposableContextPropDef,
          );
          ++meta.serial;
          ++this.serial;
          if (log.VERBOSE) {
            log.log('get: created new value', prop);
          }
        }
      }
      return prop.value ?? prop.default ?? undefined;
    }
    return undefined;
  }

  /**
   * Check if a property definition exists.
   */
  has<TValue = unknown>(
    key: TDisposableContextKey | DisposableContextPropDef<TValue>,
  ): boolean {
    return this.#propDefs.has(readKey(key));
  }

  /**
   * Return _meta info_ for a value.
   * Will always return a meta info object even when the values does not exist!
   */
  meta<TValue = unknown>(
    key: TDisposableContextKey | DisposableContextPropDef<TValue>,
  ): DisposableContextMetaInfo | undefined {
    const propDef = this.#propDefs.get(
      readKey(key),
    ) as DisposableContextPropDef;
    if (propDef) {
      return {...this.#findOrCreateMetaInfo(propDef)};
    }
    return {serial: 0, refCount: REF_COUNT_UNDEF};
  }

  #readMetaInfo = <TValue = unknown>(
    key: TDisposableContextKey | DisposableContextPropDef<TValue>,
  ): DisposableContextMetaInfo | undefined => {
    const prop = this.#propDefs.get(readKey(key)) as DisposableContextPropDef;
    if (prop) {
      return this.#findOrCreateMetaInfo(prop);
    }
    return undefined;
  };

  #findOrCreateMetaInfo = (
    prop: DisposableContextPropDef,
  ): DisposableContextMetaInfo => {
    let meta = this.#metaInfos.get(prop);
    if (!meta) {
      meta = {serial: 1, refCount: REF_COUNT_UNDEF};
      this.#metaInfos.set(prop, meta);
    }
    return meta;
  };

  /**
   * Increaase the reference counter by 1
   */
  incRefCount<TValue = unknown>(
    key: TDisposableContextKey | DisposableContextPropDef<TValue>,
  ): number | undefined {
    const meta = this.#readMetaInfo(key);
    if (meta) {
      if (meta.refCount === REF_COUNT_UNDEF) {
        meta.refCount = 1;
      } else {
        ++meta.refCount;
      }
      if (meta.refCount === 1) {
        this.#refKeys.delete(readKey(key));
      }
      return meta.refCount;
    }
    return REF_COUNT_UNDEF;
  }

  /**
   * Decrease the reference counter by 1
   */
  decRefCount<TValue = unknown>(
    key: TDisposableContextKey | DisposableContextPropDef<TValue>,
  ): number | undefined {
    const meta = this.#readMetaInfo(key);
    if (meta) {
      if (meta.refCount > 0) {
        --meta.refCount;
      }
      if (meta.refCount === 0) {
        this.#refKeys.add(readKey(key));
      }
      return meta.refCount;
    }
    return REF_COUNT_UNDEF;
  }

  /**
   * Increaase the serial
   */
  touch<TValue = unknown>(
    key: TDisposableContextKey | DisposableContextPropDef<TValue>,
  ): void {
    const meta = this.#readMetaInfo(key);
    if (meta) {
      ++meta.serial;
      ++this.serial;
    }
  }

  /**
   * Dispose a specific context value.
   * If the value exists the dispose() callback is called and
   * then the value is reset (set to null).
   * But this does not delete the value entry from the context: on the next get() call
   * the value will be recreated using the given create() factory callback.
   */
  dispose<TValue = unknown>(
    key: TDisposableContextKey | DisposableContextPropDef<TValue>,
  ): void {
    const prop = this.#propDefs.get(
      readKey(key),
    ) as DisposableContextPropDef<TValue>;
    if (prop) {
      if (prop.value != null) {
        if (log.VERBOSE) {
          log.log(`dispose: dispose "${String(key)}"`);
        }
        if (prop.dispose) {
          prop.dispose(prop.value, this);
        }
        prop.value = undefined;
        const meta = this.#findOrCreateMetaInfo(
          prop as DisposableContextPropDef,
        );
        ++meta.serial;
        ++this.serial;
      } else if (log.VERBOSE) {
        log.log(`dispose: property "${String(key)}" is already disposed!`);
      }
    } else if (log.VERBOSE) {
      log.log('dispose: could not dispose unknown property value:', key);
    }
  }

  /**
   * Dispose all unreferenced values.
   * But only dispose values which have an active reference counting.
   */
  disposeUnref(): void {
    const unrefKeys = Array.from(this.#refKeys.values());
    if (log.VERBOSE) {
      log.log('dispose unref ->', unrefKeys);
    }
    unrefKeys.forEach((key) => this.dispose(key));
    this.#refKeys.clear();
  }

  /**
   * Dispose all values.
   * Call for each stored value the dispose() callback.
   */
  disposeAll(): void {
    if (log.VERBOSE) {
      log.log('dispose all');
    }
    Array.from(this.#propDefs.values()).forEach((propDef) => {
      if (propDef.value != null) {
        propDef.dispose(propDef.value, this);
        propDef.value = undefined;
        const meta = this.#findOrCreateMetaInfo(propDef);
        ++meta.serial;
        ++this.serial;
      }
    });
  }

  /**
   * Dispose all values and remove all property definitions.
   */
  clear(): void {
    this.disposeAll();
    if (log.VERBOSE) {
      log.log('clear');
    }
    this.#propDefs.clear();
    this.#refKeys.clear();
    ++this.serial;
  }
}
