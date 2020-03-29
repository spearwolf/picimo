import {Logger} from '../utils';

const log = new Logger('picimo.Map2DContext');

export interface Map2DContextProperty {
  name: string;
  value?: unknown;
  create: () => unknown;
  dispose: (value: unknown) => void;
}

export class Map2DContext {
  #map = new Map<string, Map2DContextProperty>();

  create(property: Map2DContextProperty) {
    if (!this.#map.has(property.name)) {
      this.#map.set(property.name, property);
      if (log.VERBOSE) {
        log.log('stored property', property);
      }
    } else if (log.VERBOSE) {
      log.log('context property', property.name, 'already exists!', property);
    }
  }

  get(name: string) {
    const property = this.#map.get(name);
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

  dispose(name?: string) {
    if (name) {
      const property = this.#map.get(name);
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
      Array.from(this.#map.values()).forEach(({value, dispose}) => {
        if (value != null) {
          dispose(value);
        }
      });
      this.#map.clear();
    }
  }
}
