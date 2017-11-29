import Mat4 from '../utils/mat4'
import ShaderUniformVariable from '../core/shader_uniform_variable'

const UNIFORM_NAME = 'viewMatrix'

/**
 * @param {object} options
 * @param {number} [options.desiredWidth] - desired width
 * @param {number} [options.desiredHeight] - desired height
 * @param {number} [options.pixelRatio] - pixel ratio
 * @param {number} [options.perspective=0] - perspective distance (0 means no perspective)
 * @param {string} [options.sizeFit] - `cover`, `contain` or `fill`
 * @param {string} [options.uniformName='viewMatrix'] - name of the uniform value
 */
export default class Projection {
  constructor ({ desiredWidth, desiredHeight, pixelRatio, sizeFit, uniformName, perspective }) {
    this.desiredWidth = desiredWidth
    this.desiredHeight = desiredHeight
    this.pixelRatio = pixelRatio
    this.sizeFit = sizeFit
    this.uniformName = uniformName
    this.perspective = perspective
    this.width = 0
    this.height = 0
  }

  set uniformName (uniformName) {
    const name = uniformName || UNIFORM_NAME
    if (!this.uniform || this.uniform.name !== name) {
      this.uniform = new ShaderUniformVariable(name, new Mat4())
    }
  }

  get uniformName () {
    return (this.uniform && this.uniform.name) || UNIFORM_NAME
  }

  set perspective (distance) {
    if (typeof distance === 'number') {
      this._perspective = Math.abs(distance)
    } else {
      this._perspective = 0
    }
  }

  get perspective () {
    return this._perspective
  }

  updateOrtho (width, height) {
    if (width !== this.width || height !== this.height) {
      this.width = width
      this.height = height
      if (this.perspective > 0) {
        this.uniform.value.perspective(width, height, this.perspective) // clouds: 100
      } else {
        this.uniform.value.ortho(width, height)
      }
      this.uniform.touch()
    }
  }

  update (currentWidth, currentHeight) {
    // TODO pixelRatio and currentPixelRatio
    if (this.sizeFit === 'fill' && this.desiredWidth > 0 && this.desiredHeight > 0) {
      this.updateOrtho(this.desiredWidth, this.desiredHeight)
    } else if ((this.sizeFit === 'cover' || this.sizeFit === 'contain') &&
      this.desiredWidth >= 0 && this.desiredHeight >= 0) {
      const currentRatio = currentHeight / currentWidth            // <1 : landscape, >1 : portrait
      const desiredRatio = this.desiredHeight / this.desiredWidth
      const isCover = this.sizeFit === 'cover'

      let width = this.desiredWidth
      let height = this.desiredHeight

      if ((this.desiredWidth === 0 && this.desiredHeight) || currentRatio < desiredRatio) {
        width = (this.desiredHeight / currentHeight) * currentWidth
        if (isCover) {
          const factor = this.desiredWidth / width
          width *= factor
          height *= factor
        }
      } else if ((this.desiredWidth && this.desiredHeight === 0) || currentRatio > desiredRatio) {
        height = (this.desiredWidth / currentWidth) * currentHeight
        if (isCover) {
          const factor = this.desiredHeight / height
          width *= factor
          height *= factor
        }
      }

      this.updateOrtho(width, height)
    }
  }
}
