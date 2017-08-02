import Projection from '../../core/projection'

import { COMP_PRIO_PROJECTION } from '../constants'

export default class ProjectionComponent {
  constructor (entity, data) {
    this.projection = new Projection(data)
    entity.on('*', COMP_PRIO_PROJECTION, this)
  }

  animateFrame (app) {
    this.projection.update(app.width, app.height)
  }

  renderFrame (renderer) {
    renderer.shaderContext.pushVar(this.projection.uniform)
  }

  debug () {
    console.dir(this.projection)
  }

  update (data) {
    console.log('TODO ProjectionComponent.update(', data, ')')
  }

  disconnectedEntity (entity) {
    console.log('ProjectionComponent.disconnectedEntity(', entity, ')')
    entity.off(this)
  }
}
