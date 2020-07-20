import {Logger} from '.';

const log = new Logger('picimo.DisposableContext');

export type TContextValueName = string | symbol;

export interface DisposableContextValue<TValue = unknown> {
  name: TContextValueName;
  value?: TValue;
  create: (context: DisposableContext) => TValue;
  dispose: (value: TValue, context: DisposableContext) => void;
}

const isValueName = (name: any): name is TContextValueName => {
  switch (typeof name) {
    case 'string':
    case 'symbol':
      return true;
    default:
      return false;
  }
};

// TODO
// - [x] rename to DisposableContext
// - [x] no need for Map2D in the name
// - [x] it has no relationship to a Map2D
// - [x] maybe this class is NOT needed at all? (yes;)
// - [ ] add a reference counter?
//   - see MaterialCache
//   - would enable a .disposeUnref() and .disposeAll() api
export class DisposableContext {
  #values = new Map<TContextValueName, DisposableContextValue>();

  create<TValue = unknown>(property: DisposableContextValue<TValue>): void {
    if (!this.#values.has(property.name)) {
      this.#values.set(property.name, property as DisposableContextValue);
      if (log.VERBOSE) {
        log.log('created property', property);
      }
    } else {
      const prevProp = this.#values.get(property.name);
      if (prevProp.value != null && prevProp.create !== property.create) {
        prevProp.dispose(prevProp.value, this);
        prevProp.value = undefined;
      }
      if (property.value != null && property.value !== prevProp.value) {
        if (prevProp.value != null) {
          prevProp.dispose(prevProp.value, this);
        }
        prevProp.value = property.value;
      }
      Object.assign(prevProp, {
        create: property.create,
        dispose: property.dispose,
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
    name: TContextValueName | DisposableContextValue<TValue>,
  ): TValue | undefined {
    const property = this.#values.get(
      isValueName(name) ? name : name.name,
    ) as DisposableContextValue<TValue>;
    if (property) {
      if (property.value != null) {
        return property.value;
      }
      property.value = property.create(this);
      if (log.VERBOSE) {
        log.log('created', property);
      }
      return property.value;
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
  dispose(name?: string): void {
    const property = this.#values.get(name);
    if (property) {
      if (property.value != null) {
        if (log.VERBOSE) {
          log.log(`dispose "${name}"`);
        }
        property.dispose(property.value, this);
        property.value = null;
      } else if (log.VERBOSE) {
        log.log(`property "${name}" is already disposed!`);
      }
    } else if (log.VERBOSE) {
      log.log('can not dispose unknown property:', name);
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
