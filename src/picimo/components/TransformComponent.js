import { PRIO_RF_TRANSFORM, PRIO_PRF_TRANSFORM } from 'picimo/priorities'
import { Mat4, getNumber } from 'picimo/utils'

import { PROJECTION } from './constants'

const updateAttributes = (transform, data) => {
  const { transformMat4: mat4 } = transform
  mat4.identity()
  transform.needsUpdate = true

  if (!data) return

  mat4.translate(
    getNumber(data.x, 0),
    getNumber(data.y, 0),
    getNumber(data.z, 0)
  )

  mat4.rotateX(getNumber(data.rotateX, 0))
  mat4.rotateY(getNumber(data.rotateY, 0))
  mat4.rotateZ(getNumber(data.rotateZ, 0))

  mat4.scale(
    getNumber(data.scaleX, 1),
    getNumber(data.scaleY, 1),
    getNumber(data.scaleZ, 1)
  )

  // TODO allow data is a array to set all transform matrix values at once
}

const checkProjectionUpdate = (transform, projection) => {
  if (projection !== transform.projection || projection.serial !== transform.projectionSerial) {
    transform.projection = projection
    transform.projectionSerial = projection.serial
    transform.needsUpdate = true
  }
}

export default class TransformComponent {
  constructor (entity, data) {
    this.viewMat4 = new Mat4()
    this.transformMat4 = new Mat4()
    this.uniform = null

    this.projection = null
    this.projectionSerial = undefined

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
    // create an uniform initially if we don't have one
    if (!this.uniform) {
      this.uniform = renderer.context.get(PROJECTION).createUniform()
      this.uniform.value = this.viewMat4
    }

    // read out current projection/view matrix
    const projection = renderer.shaderContext.curVar(this.uniform)
    checkProjectionUpdate(this, projection)

    // update our view matrix if something changed
    if (this.needsUpdate) {
      this.viewMat4.multiply(projection.value, this.transformMat4)

      this.uniform.touch()
      this.needsUpdate = false
    }

    // set our view matrix to the current one
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
