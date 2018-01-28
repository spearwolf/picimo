
export default class ComponentRegistry {
  constructor (parentComponentRegistry) {
    this.registry = new Map()
    this.parentComponentRegistry = parentComponentRegistry
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
    let factory = this.registry.get(name)
    if (!factory) {
      if (this.parentComponentRegistry) {
        this.parentComponentRegistry.createComponent(entity, name, data)
      }
      return this
    }
    const component = factory.create(entity, data)
    entity.setComponent(name, component, this)
    return this
  }

  updateComponent (entity, name, data) {
    const factory = this.registry.get(name)
    if (!factory) {
      if (this.parentComponentRegistry) {
        this.parentComponentRegistry.updateComponent(entity, name, data)
      }
      return this
    }
    const component = entity[name]
    factory.update(component, data)
    return this
  }

  createOrUpdateComponent (entity, name, data) {
    const componentRegistry = entity.getComponentRegistry(name)
    if (componentRegistry) {
      componentRegistry.updateComponent(entity, name, data)
    } else {
      this.createComponent(entity, name, data)
    }
    return this
  }

  destroyComponent (entity, name) {
    const factory = this.registry.get(name)
    if (!factory) {
      if (this.parentComponentRegistry) {
        this.parentComponentRegistry.destroyComponent(entity, name)
      }
      return this
    }
    const component = entity[name]
    factory.destroy(component)
    return this
  }
}
