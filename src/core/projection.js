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

  updateOrtho () {
    this.uniform.value.ortho(this.width, this.height)
    this.uniform.touch()
  }

  update (currentWidth, currentHeight, currentPixelRatio = 1) {
    // TODO pixelRatio and currentPixelRatio
    if (this.sizeFit === 'fill' && this.desiredWidth > 0 && this.desiredHeight > 0) {
      this.width = this.desiredWidth
      this.height = this.desiredHeight
      this.updateOrtho()
    } else if ((this.sizeFit === 'cover' || this.sizeFit === 'contain') &&
      this.desiredWidth >= 0 && this.desiredHeight >= 0) {
      const currentRatio = currentHeight / currentWidth            // <1 : landscape, >1 : portrait
      const desiredRatio = this.desiredHeight / this.desiredWidth
      const isCover = this.sizeFit === 'cover'

      if ((this.desiredWidth === 0 && this.desiredHeight) || currentRatio < desiredRatio) {
        this.width = (this.desiredHeight / currentHeight) * currentWidth
        this.height = this.desiredHeight

        if (isCover) {
          const factor = this.desiredWidth / this.width
          this.width *= factor
          this.height *= factor
        }
      } else if ((this.desiredWidth && this.desiredHeight === 0) || currentRatio > desiredRatio) {
        this.width = this.desiredWidth
        this.height = (this.desiredWidth / currentWidth) * currentHeight

        if (isCover) {
          const factor = this.desiredHeight / this.height
          this.width *= factor
          this.height *= factor
        }
      } else {
        this.width = this.desiredWidth
        this.height = this.desiredHeight
      }
      this.updateOrtho()
    }
  }
}
