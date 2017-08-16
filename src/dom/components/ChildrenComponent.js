import { COMP_PRIO_CHILDREN } from '../constants'

const eventize = require('@spearwolf/eventize')

const PRIO_BEFORE_CHILDREN = COMP_PRIO_CHILDREN + 1
const PRIO_AFTER_CHILDREN = COMP_PRIO_CHILDREN - 1

class BeforeChildren {
  constructor (entity) {
    this.entity = entity
  }

  renderFrame (renderer) {
    this.entity.emit('renderFrameBeforeChildren', renderer)
  }
}

class AfterChildren {
  constructor (entity) {
    this.entity = entity
  }

  renderFrame (renderer) {
    this.entity.emit('renderFrameAfterChildren', renderer)
  }
}

export default class ChildrenComponent {
  constructor (entity) {
    eventize(this)

    this.beforeChildren = new BeforeChildren(entity)
    this.afterChildren = new AfterChildren(entity)

    entity.on('*', COMP_PRIO_CHILDREN, this)
    entity.on('*', PRIO_BEFORE_CHILDREN, this.beforeChildren)
    entity.on('*', PRIO_AFTER_CHILDREN, this.afterChildren)
  }

  renderFrameBeforeChildren () {
    // do not inform children about this event!
  }

  renderFrameAfterChildren () {
    // do not inform children about this event!
  }

  appendChild (entity) {
    if (entity.hasComponent('parentEntity')) {
      entity.destroyComponent('parentEntity')
    }
    entity.setComponent('parentEntity', this)
    this.on(entity)
  }

  removeChild (entity) {
    this.off(entity)
    entity.destroyComponent('parentEntity')
  }

  disconnectedEntity (entity) {
    console.log('ChildrenComponent.disconnectedEntity(', entity, ')')
    entity.off(this.afterChildren)
    entity.off(this.beforeChildren)
    entity.off(this)
  }
}
