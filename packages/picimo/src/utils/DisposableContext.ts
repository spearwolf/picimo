import {Logger} from '.';

const log = new Logger('picimo.DisposableContext');

export interface DisposableContextValue<TValue = unknown> {
  name: string;
  value?: TValue;
  create: () => TValue;
  dispose: (value: TValue) => void;
}

// TODO
// - [x] rename to DisposableContext
// - [x] no need for Map2D in the name
// - [x] it has no relationship to a Map2D
// - [ ] maybe this class is NOT needed at all?
// - [ ] add a reference counter?
//   - would enable a .disposeUnref() and .disposeAll() api
export class DisposableContext {
  #values = new Map<string, DisposableContextValue>();

  create<TValue = unknown>(property: DisposableContextValue<TValue>): void {
    if (!this.#values.has(property.name)) {
      this.#values.set(property.name, property as DisposableContextValue);
      if (log.VERBOSE) {
        log.log('created property', property);
      }
    } else if (log.VERBOSE) {
      log.log('context property', property.name, 'already exists!', property);
    }
  }

  get<TValue = unknown>(
    name: string | DisposableContextValue<TValue>,
  ): TValue | null {
    const property = this.#values.get(
      typeof name === 'string' ? name : name.name,
    ) as DisposableContextValue<TValue>;
    if (property) {
      if (property.value != null) {
        return property.value;
      }
      property.value = property.create();
      if (log.VERBOSE) {
        log.log('created', property);
      }
      return property.value;
    }
    return null;
  }

  /**
   * Dispose all or a specific context value
   */
  dispose(name?: string): void {
    if (name) {
      const property = this.#values.get(name);
      if (property) {
        if (property.value != null) {
          if (log.VERBOSE) {
            log.log(`dispose "${name}"`);
          }
          property.dispose(property.value);
          property.value = null;
        } else if (log.VERBOSE) {
          log.log(`property "${name}" is already disposed!`);
        }
      } else if (log.VERBOSE) {
        log.log('can not dispose unknown property:', name);
      }
    } else {
      if (log.VERBOSE) {
        log.log('dispose all');
      }
      Array.from(this.#values.values()).forEach(({value, dispose}) => {
        if (value != null) {
          dispose(value);
        }
      });
      this.#values.clear();
    }
  }
}
