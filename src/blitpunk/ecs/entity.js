import eventize from '@spearwolf/eventize'
import generateUUID from '../utils/generate_uuid'

const destroyAllComponents = (entity) => {
  for (const name of entity.registries.keys()) {
    entity.destroyComponent(name)
  }
}

/**
 * An Entity.
 */
export default class Entity {
  constructor () {
    this.registries = new Map()

    /**
     * @type {string}
     */
    this.id = generateUUID()

    eventize(this)
  }

  hasComponent (name) {
    return this.registries.has(name)
  }

  getComponentRegistry (name) {
    return this.registries.get(name)
  }

  setComponent (name, component, registry) {
    if (this[name]) {
      throw new Error(`Component name "${name}" is already assigned!`)
    }
    this.registries.set(name, registry)
    this[name] = component
    if (component.connectedEntity) {
      component.connectedEntity(this)
    }
    return this
  }

  queryComponent (name, filterCallback) {
    const component = this[name]
    if (component && filterCallback) {
      return filterCallback(component)
    }
    return component
  }

  destroyComponent (name) {
    if (this.registries.has(name)) {
      const registry = this.registries.get(name)
      this.registries.delete(name)

      if (registry) {
        registry.destroyComponent(this, name)
      }

      const component = this[name]
      delete this[name]
      if (component.disconnectedEntity) {
        component.disconnectedEntity(this)
      }
    }
    return this
  }

  destroy () {
    this.emit('destroy', this)
    destroyAllComponents(this)
  }
}
