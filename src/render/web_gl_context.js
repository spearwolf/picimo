import WebGlResourceLibrary from './web_gl_resource_library'
import WebGlTextureManager from './web_gl_texture_manager'
import destroy from '../utils/destroy'

export default class WebGlContext {
  constructor (gl) {
    Object.defineProperty(this, 'gl', { value: gl })

    initialize(this)

    this.resourceLibrary = new WebGlResourceLibrary(this)
    this.boundBuffers = new Map()
    this.currentProgram = 0
    this.enabledVertexAttribLocations = []

    this.textureManager = new WebGlTextureManager(this)

    this.boundTextures = new Array(this.MAX_TEXTURE_IMAGE_UNITS)
    for (let i = 0; i < this.boundTextures.length; i++) {
      this.boundTextures[i] = { TEXTURE_2D: null }
    }

    this.readCurrentState()
    this.activeTexture(0) // enable first texture unit by default
  }

  destroy () {
    this.textureManager.destroy()
    this.boundBuffers.clear()
    this.resourceLibrary.destroy()
    destroy(this)
  }

  /**
   * @param {BlendMode} blendMode
   */
  blend (blendMode) {
    const { gl } = this
    if (blendMode.enable) {
      if (!this.blendEnabled) {
        gl.enable(gl.BLEND)
        this.blendEnabled = true
      }
      gl.blendFunc(gl[blendMode.sfactor], gl[blendMode.dfactor])
    } else if (this.blendEnabled) {
      gl.disable(gl.BLEND)
      this.blendEnabled = false
    }
  }

  /**
   * @param {number} texUnit
   */
  activeTexture (texUnit) {
    const { gl } = this
    const tex = gl.TEXTURE0 + texUnit

    if (this.activeTexUnit !== tex) {
      this.activeTexUnit = tex
      gl.activeTexture(this.activeTexUnit)
    }
  }

  /**
   * @param {number} glTextureId
   */
  bindTexture2d (glTextureId) {
    const { gl } = this
    const bound = this.boundTextures[this.activeTexUnit - gl.TEXTURE0]

    if (bound.TEXTURE_2D !== glTextureId) {
      bound.TEXTURE_2D = glTextureId
      gl.bindTexture(gl.TEXTURE_2D, glTextureId)
    }
  }

  readCurrentState () {
    const { gl } = this

    // https://developer.mozilla.org/de/docs/Web/API/WebGLRenderingContext/getParameter

    this.boundBuffers.set(
      gl.ARRAY_BUFFER,
      gl.getParameter(gl.ARRAY_BUFFER_BINDING))
    this.boundBuffers.set(
      gl.ELEMENT_ARRAY_BUFFER,
      gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING))

    this.currentProgram = gl.getParameter(gl.CURRENT_PROGRAM)
    this.blendEnabled = gl.getParameter(gl.BLEND)
  }

  bindBuffer (target, buffer) {
    if (this.boundBuffers.get(target) !== buffer) {
      this.gl.bindBuffer(target, buffer)
      this.boundBuffers.set(target, buffer)
    }
  }

  /**
   * @return {boolean}
   */
  useProgram (glProgram) {
    if (this.currentProgram !== glProgram) {
      this.gl.useProgram(glProgram)
      this.currentProgram = glProgram
      return true
    }
    return false
  }

  enableVertexAttribArrays (enableLocations) {
    const { gl } = this

    this.enabledVertexAttribLocations
      .filter(location => enableLocations.indexOf(location) === -1)
      .forEach(location => {
        gl.disableVertexAttribArray(location)
        this.enabledVertexAttribLocations.splice(enableLocations.indexOf(location), 1)
      })

    enableLocations.forEach(loc => {
      const idx = this.enabledVertexAttribLocations.indexOf(loc)
      if (idx === -1) {
        gl.enableVertexAttribArray(loc)
        this.enabledVertexAttribLocations.push(loc)
      }
    })
  }
}

/** @private */
function initialize (glx) {
  const { gl } = glx

  glx.DEPTH_BITS = gl.getParameter(gl.DEPTH_BITS)
  glx.MAX_TEXTURE_IMAGE_UNITS = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)
}
