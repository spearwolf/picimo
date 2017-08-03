import Mat4 from '../utils/mat4'
import ShaderUniformVariable from '../core/shader_uniform_variable'

const UNIFORM_NAME = 'viewMatrix'

/**
 * @param {object} options
 * @param {number} [options.desiredWidth] - desired width
 * @param {number} [options.desiredHeight] - desired height
 * @param {number} [options.pixelRatio] - pixel ratio
 * @param {string} [options.sizeFit] - `cover`, `contain` or `fill`
 * @param {string} [options.uniformName='viewMatrix'] - name of the uniform value
 */
export default class Projection {
  constructor ({ desiredWidth, desiredHeight, pixelRatio, sizeFit, uniformName }) {
    this.desiredWidth = desiredWidth
    this.desiredHeight = desiredHeight
    this.pixelRatio = pixelRatio
    this.sizeFit = sizeFit
    this.uniform = new ShaderUniformVariable(uniformName || UNIFORM_NAME, new Mat4())
    this.width = 0
    this.height = 0
  }

  updateOrtho (width, height) {
    if (width !== this.width || height !== this.height) {
      this.width = width
      this.height = height
      // this.uniform.value.ortho(width, height)
      // TODO enable perspective with distance
      this.uniform.value.perspective(width, height, 100)
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
