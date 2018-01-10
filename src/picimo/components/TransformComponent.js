import { PRIO_RF_TRANSFORM, PRIO_PRF_TRANSFORM } from 'picimo/priorities'
import { Mat4, getNumber } from 'picimo/utils'

import { PROJECTION } from './constants'

const updateAttributes = (transform, data) => {
  const { transformMat4: t } = transform
  t.identity()
  transform.needsUpdate = true

  if (!data) return

  t.x = getNumber(data.x, 0)
  t.y = getNumber(data.y, 0)
  t.z = getNumber(data.z, 0)

  t.rotateX(getNumber(data.rotateX, 0))
  t.rotateY(getNumber(data.rotateY, 0))
  t.rotateZ(getNumber(data.rotateZ, 0))

  t.sx = getNumber(data.scaleX, 1)
  t.sy = getNumber(data.scaleY, 1)
  t.sz = getNumber(data.scaleZ, 1)

  // TODO allow data is a array to set all transform matrix values at once
}

export default class TransformComponent {
  constructor (entity, data) {
    this.viewMat4 = new Mat4()
    this.transformMat4 = new Mat4()
    this.uniform = null

    updateAttributes(this, data)
  }

  update (data) {
    updateAttributes(this, data)
  }

  connectedEntity (entity) {
    entity.on('renderFrame', PRIO_RF_TRANSFORM, this)
    entity.on('postRenderFrame', PRIO_PRF_TRANSFORM, this)
  }

  disconnectedEntity (entity) {
    entity.off(this)
  }

  renderFrame (renderer, canvas) {
    if (this.needsUpdate) {
      const projection = renderer.context.get(PROJECTION)

      this.viewMat4.multiply(projection.mat4, this.transformMat4)

      if (!this.uniform) {
        this.uniform = projection.createUniform()
        this.uniform.value = this.viewMat4
      }

      this.uniform.touch()
      this.needsUpdate = false
    }

    if (this.uniform) {
      renderer.shaderContext.pushVar(this.uniform)
    }
  }

  postRenderFrame (renderer) {
    if (this.uniform) {
      renderer.shaderContext.popVar(this.uniform)
    }
  }
}
