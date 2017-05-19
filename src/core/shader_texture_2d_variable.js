import ShaderVariable from './shader_variable'

/**
 * Shader texture 2d variable.
 */
export default class ShaderTexture2dVariable extends ShaderVariable {
  /**
   * @param {string} name
   * @param {number|Object} value
   */
  constructor (name, value) {
    super(name, ShaderVariable.TYPE.TEXTURE_2D, value)
    this.texture = null
  }

  /**
   * @param {WebGlContext} glx
   */
  bindTexture (glx) {
    if (this.texture != null) {
      const texRef = this.texture.resourceRef
      const glTexRef = glx.resourceLibrary.loadTexture(texRef)
      this.value = glx.textureManager.bindWebGlTexture(glTexRef.resource)
    }
  }
}
