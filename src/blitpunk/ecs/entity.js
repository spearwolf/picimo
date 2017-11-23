import generateUUID from '../utils/generate_uuid'

const eventize = require('@spearwolf/eventize')

const destroyAllComponents = (entity) => {
  for (const name of entity.components.keys()) {
    entity.destroyComponent(name)
  }
}

/**
 * An Entity.
 */
export default class Entity {
  constructor () {
    this.components = new Map()

    /**
     * @type {string}
     */
    this.id = generateUUID()

    eventize(this)
  }

  hasComponent (name) {
    return this.components.has(name)
  }

  setComponent (name, component) {
    if (this[name]) {
      throw new Error(`Component name "${name}" is already assigned!`)
    }
    this.components.set(name, component)
    this[name] = component
    if (component.connectedEntity) {
      component.connectedEntity(this)
    }
    return this
  }

  destroyComponent (name) {
    if (this.components.delete(name)) {
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
