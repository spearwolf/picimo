import { Projection } from 'picimo/core'
import { PRIO_RF_PROJECTION } from 'picimo/priorities'
import { debug } from 'common/log'

export default class ProjectionComponent {
  constructor (entity, data) {
    this.projection = new Projection(data)
    debug('[projection] create', this)
  }

  update (data) {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        this.projection[key] = value
      })
    }
    debug('[projection] udpate', this)
  }

  connectedEntity (entity) {
    entity.on('renderFrame', PRIO_RF_PROJECTION, this)
  }

  disconnectedEntity (entity) {
    entity.off(this)
  }

  renderFrame (renderer, canvas) {
    this.projection.update(canvas.width, canvas.height)
    renderer.shaderContext.pushVar(this.projection.uniform)
  }
}
