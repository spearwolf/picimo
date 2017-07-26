import Entity from './entity'

/**
 * The entity manager holds references to all entities.
 */
export default class EntityManager {
  constructor () {
    this.entities = new Map()
  }

  createEntity () {
    const entity = new Entity()
    this.entities.set(entity.id, entity)
    return entity
  }

  getEntity (id) {
    return this.entities.get(id)
  }

  destroyEntity (id) {
    const entity = this.entities.get(id)
    if (entity) {
      entity.destroy()
      this.entities.delete(id)
      return true
    }
    return false
  }
}
