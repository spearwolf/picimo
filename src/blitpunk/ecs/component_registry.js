
export default class ComponentRegistry {
  constructor () {
    this.registry = new Map()
  }

  /**
   * @param {string} name - component name
   * @param {object} componentFactory - the component factory interface
   * @param {function} componentFactory.create - create a new component instance
   * @param {function} componentFactory.update - update a component
   * @param {function} componentFactory.destroy - remove a component
   */
  registerComponent (name, componentFactory) {
    this.registry.set(name, componentFactory)
    return this
  }

  createComponent (entity, name, data) {
    const factory = this.registry.get(name)
    if (!factory) return this
    const component = factory.create(entity, data)
    entity.setComponent(name, component, this)
    return this
  }

  updateComponent (entity, name, data) {
    const factory = this.registry.get(name)
    if (!factory) return this
    const component = entity[name]
    factory.update(component, data)
    return this
  }

  createOrUpdateComponent (entity, name, data) {
    if (entity.getComponentRegistry(name) === this) {
      this.updateComponent(entity, name, data)
    } else {
      this.createComponent(entity, name, data)
    }
    return this
  }

  destroyComponent (entity, name) {
    const factory = this.registry.get(name)
    if (!factory) return this
    const component = entity[name]
    factory.destroy(component)
    return this
  }
}
