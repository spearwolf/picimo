import eventize from '@spearwolf/eventize'

import { COMPONENT_RENDER_PRIO_CHILDREN } from '../constants'

export default class ChildrenComponent {
  constructor (entity) {
    eventize(this)
    entity.on('*', COMPONENT_RENDER_PRIO_CHILDREN, this)
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
    console.log('ProjectionComponent.disconnectedEntity(', entity, ')')
    entity.off(this)
  }
}
