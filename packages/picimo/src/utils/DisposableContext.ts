import {Logger} from '.';

const log = new Logger('picimo.DisposableContext');

export type TContextValueName = string | symbol;

export interface DisposableContextValue<TValue = unknown> {
  key: TContextValueName;
  value?: TValue;
  create?: (context: DisposableContext) => TValue;
  dispose: (value: TValue, context: DisposableContext) => void;
}

const isValueKey = (key: any): key is TContextValueName => {
  switch (typeof key) {
    case 'string':
    case 'symbol':
      return true;
    default:
      return false;
  }
};

// TODO
// - [x] rename to DisposableContext
// - [x] no need for Map2D in the key
// - [x] it has no relationship to a Map2D
// - [x] maybe this class is NOT needed at all? (yes;)
// - [ ] add a reference counter?
//   - see MaterialCache
//   - add .disposeUnref()

export class DisposableContext {
  #values = new Map<TContextValueName, DisposableContextValue>();

  create<TValue = unknown>(prop: DisposableContextValue<TValue>): void {
    if (!this.#values.has(prop.key)) {
      this.#values.set(prop.key, prop as DisposableContextValue);
      if (log.VERBOSE) {
        log.log('created property', prop);
      }
    } else {
      const curProp = this.#values.get(prop.key);
      if (curProp.value != null && curProp.create !== prop.create) {
        curProp.dispose(curProp.value, this);
        curProp.value = undefined;
        if (log.VERBOSE) {
          log.log('cleared value because create() changed', prop);
        }
      }
      if (prop.value != null && prop.value !== curProp.value) {
        if (curProp.value != null) {
          curProp.dispose(curProp.value, this);
          if (log.VERBOSE) {
            log.log(
              'disposed the value because a new value was explicitly set with create()',
              prop,
            );
          }
        }
        curProp.value = prop.value;
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
    key: TContextValueName | DisposableContextValue<TValue>,
  ): TValue | undefined {
    const prop = this.#values.get(
      isValueKey(key) ? key : key.key,
    ) as DisposableContextValue<TValue>;
    if (prop) {
      if (prop.value != null) {
        return prop.value;
      }
      if (prop.create) {
        prop.value = prop.create(this);
        if (log.VERBOSE) {
          log.log('created new value', prop);
        }
      }
      return prop.value;
    }
    return undefined;
  }

  /**
   * Dispose a specific context value.
   * If the value exists the dispose() callback is called and
   * then the value is reset (set to null).
   * But this does not delete the value entry from the context: on the next get() call
   * the value will be recreated using the given create() factory callback.
   */
  dispose<TValue = unknown>(
    key: TContextValueName | DisposableContextValue<TValue>,
  ): void {
    const property = this.#values.get(
      isValueKey(key) ? key : key.key,
    ) as DisposableContextValue<TValue>;
    if (property) {
      if (property.value != null) {
        if (log.VERBOSE) {
          log.log(`dispose "${String(key)}"`);
        }
        property.dispose(property.value, this);
        property.value = null;
      } else if (log.VERBOSE) {
        log.log(`property "${String(key)}" is already disposed!`);
      }
    } else if (log.VERBOSE) {
      log.log('could not dispose unknown property value:', key);
    }
  }

  /**
   * Dispose all context values.
   * Call for each stored value the dispose() callback.
   * This will also clear all values - so that after this call the context is empty.
   *
   * @param clearAfterDispose if set to false the values are not cleared after disposal
   */
  disposeAll(clearAfterDispose = true): void {
    if (log.VERBOSE) {
      log.log('dispose all');
    }
    Array.from(this.#values.values()).forEach(({value, dispose}) => {
      if (value != null) {
        dispose(value, this);
      }
    });
    if (clearAfterDispose) {
      this.#values.clear();
    }
  }
}
