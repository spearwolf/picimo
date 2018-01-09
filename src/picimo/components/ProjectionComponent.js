import { Projection } from 'picimo/core'
import { PRIO_RF_PROJECTION, PRIO_PRF_PROJECTION } from 'picimo/priorities'

const PROJECTION = 'projection'

export default class ProjectionComponent {
  constructor (entity, data) {
    this.projection = new Projection(data)
  }

  update (data) {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        this.projection[key] = value
      })
    }
  }

  connectedEntity (entity) {
    entity.on('renderFrame', PRIO_RF_PROJECTION, this)
    entity.on('postRenderFrame', PRIO_PRF_PROJECTION, this)
  }

  disconnectedEntity (entity) {
    entity.off(this)
  }

  renderFrame (renderer, canvas) {
    const { projection } = this
    projection.update(canvas.width, canvas.height)
    renderer.context.push(PROJECTION, projection)
    renderer.shaderContext.pushVar(projection.uniform)
  }

  postRenderFrame (renderer) {
    renderer.shaderContext.popVar(this.projection.uniform)
    renderer.context.pop(PROJECTION)
  }
}
