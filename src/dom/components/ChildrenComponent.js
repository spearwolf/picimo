import eventize from '@spearwolf/eventize'

import { COMPONENT_RENDER_PRIO_CHILDREN } from '../constants'

export default class ChildrenComponent {
  constructor (entity) {
    eventize(this)
    entity.on('*', COMPONENT_RENDER_PRIO_CHILDREN, this)
  }

  appendChild (entity) {
    this.on(entity)
  }

  removeChild (entity) {
    this.off(entity)
  }

  disconnectedEntity (entity) {
    console.log('ProjectionComponent.disconnectedEntity(', entity, ')')
    entity.off(this)
  }
}
