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

export class DisposableContext {
  #propDefs = new Map<TDisposableContextKey, DisposableContextPropDef>();
  #metaInfos = new WeakMap<
    DisposableContextPropDef,
    DisposableContextMetaInfo
  >();
  #refKeys = new Set<TDisposableContextKey>();

  set<TValue = unknown>(prop: DisposableContextPropDef<TValue>): void {
    if (!this.#propDefs.has(prop.key)) {
      this.#propDefs.set(prop.key, prop as DisposableContextPropDef);
      if (log.VERBOSE) {
        log.log('set: created property', prop);
      }
    } else {
      const meta = this.#findOrCreateMetaInfo(prop as DisposableContextPropDef);
      const curProp = this.#propDefs.get(prop.key);
      if (curProp.value != null && curProp.create !== prop.create) {
        if (curProp.dispose) {
          curProp.dispose(curProp.value, this);
        }
        curProp.value = undefined;
        meta.serial++;
        if (log.VERBOSE) {
          log.log('set: cleared previuos value because create() changed', {
            prop,
            meta,
          });
        }
      }
      if (prop.value != null && prop.value !== curProp.value) {
        if (curProp.value != null) {
          if (curProp.dispose) {
            curProp.dispose(curProp.value, this);
            if (log.VERBOSE) {
              log.log(
                'set: disposed previous value because a new value was explicitly set',
                prop,
              );
            }
          }
        }
        curProp.value = prop.value;
        meta.serial++;
      }
      Object.assign(curProp, {
        create: prop.create,
        dispose: prop.dispose,
      });
    }
  }

  /**
   * Return a context value.
   * If the context value entry is previously defined by create() but
   * not yet created (the _value_ is undefined) then the value will be created
   * through the given create() factory method.
   */
  get<TValue = unknown>(
    key: TDisposableContextKey | DisposableContextPropDef<TValue>,
  ): TValue | undefined {
    const prop = this.#propDefs.get(
      isValueKey(key) ? key : key.key,
    ) as DisposableContextPropDef<TValue>;
    if (prop) {
      if (prop.value != null) {
        return prop.value;
      }
      if (prop.create) {
        prop.value = prop.create(this);
        const meta = this.#findOrCreateMetaInfo(
          prop as DisposableContextPropDef,
        );
        meta.serial++;
        if (log.VERBOSE) {
          log.log('get: created new value', prop);
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
    return this.#propDefs.has(isValueKey(key) ? key : key.key);
  }

  /**
   * Return _meta info_ for a value.
   * Will always return a meta info object even when the values does not exist!
   */
  meta<TValue = unknown>(
    key: TDisposableContextKey | DisposableContextPropDef<TValue>,
  ): DisposableContextMetaInfo | undefined {
    const propDef = this.#propDefs.get(
      isValueKey(key) ? key : key.key,
    ) as DisposableContextPropDef;
    if (propDef) {
      return {...this.#findOrCreateMetaInfo(propDef)};
    }
    return {serial: 0, refCount: REF_COUNT_UNDEF};
  }

  #readMetaInfo = <TValue = unknown>(
    key: TDisposableContextKey | DisposableContextPropDef<TValue>,
  ): DisposableContextMetaInfo | undefined => {
    const prop = this.#propDefs.get(
      isValueKey(key) ? key : key.key,
    ) as DisposableContextPropDef;
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
        meta.refCount++;
      }
      if (meta.refCount === 1) {
        this.#refKeys.delete(isValueKey(key) ? key : key.key);
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
        this.#refKeys.add(isValueKey(key) ? key : key.key);
      }
      return meta.refCount;
    }
    return REF_COUNT_UNDEF;
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
      isValueKey(key) ? key : key.key,
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
  }
}
