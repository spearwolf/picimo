
export default class ComponentRegistry {
  constructor () {
    this.registry = new Map()
  }

  /**
   * @param {string} name - component name
   * @param {object} componentFactory - the component factory interface
   * @param {function} componentFactory.create - create a new component instance
   * @param {function} componentFactory.update - update a component
   */
  registerComponent (name, componentFactory) {
    this.registry.set(name, componentFactory)
    return this
  }

  createComponent (entity, name, data) {
    const factory = this.registry.get(name)
    const component = factory.create(entity, data)
    entity.setComponent(name, component)
    return this
  }

  updateComponent (entity, name, data) {
    const component = entity[name]
    const factory = this.registry.get(name)
    factory.update(component, data)
    return this
  }

  createOrUpdateComponent (entity, name, data) {
    if (entity[name] != null) {
      this.updateComponent(entity, name, data)
    } else {
      this.createComponent(entity, name, data)
    }
    return this
  }
}
