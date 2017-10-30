import ResourceRef from '../utils/resource_ref'
import WebGlShader from './web_gl_shader'
import WebGlProgram from './web_gl_program'
import WebGlBuffer from './web_gl_buffer'
import WebGlTexture from './web_gl_texture'

import destroy from '../utils/destroy'

const WEB_GL_BUFFER_USAGE = Object.freeze({
  static: WebGlBuffer.STATIC_DRAW,
  dynamic: WebGlBuffer.DYNAMIC_DRAW
})

export default class WebGlResourceLibrary {
  constructor (glx) {
    Object.defineProperty(this, 'glx', { value: glx })

    /** @private */
    this.vertexShader = new Map()
    /** @private */
    this.fragmentShader = new Map()
    /** @private */
    this.shaderProgram = new Map()
    /** @private */
    this.buffer = new Map()
    /** @private */
    this.texture = new Map()
  }

  destroy () {
    this.texture.clear()
    this.buffer.clear()
    this.shaderProgram.clear()
    this.fragmentShader.clear()
    this.vertexShader.clear()
    destroy(this)
  }

  loadVertexShader (shaderSource) {
    let glShader = this.vertexShader.get(shaderSource.id)
    if (!glShader) {
      glShader = new WebGlShader(this.glx, shaderSource)
      this.vertexShader.set(shaderSource.id, glShader)
    }
    return glShader
  }

  loadFragementShader (shaderSource) {
    let glShader = this.fragmentShader.get(shaderSource.id)
    if (!glShader) {
      glShader = new WebGlShader(this.glx, shaderSource)
      this.vertexShader.set(shaderSource.id, glShader)
    }
    return glShader
  }

  loadProgram (shaderProgram) {
    let program = this.shaderProgram.get(shaderProgram.id)
    if (!program) {
      program = new WebGlProgram(this.glx, shaderProgram)
      this.shaderProgram.set(shaderProgram.id, program)
    }
    return program
  }

  /**
   * @param {ResourceRef} ref - resource reference to VOArray or `ElementIndexArray`
   * @returns {ResourceRef} resource reference to `WebGlBuffer`
   */
  loadBuffer (ref) {
    let bufferRef = this.buffer.get(ref.id)
    if (!bufferRef) {
      // create WebGlBuffer
      const target = ref.hints.target || WebGlBuffer.ARRAY_BUFFER
      const glBuffer = new WebGlBuffer(this.glx, target, WEB_GL_BUFFER_USAGE[ref.hints.usage])
      // create ResourceRef
      bufferRef = new ResourceRef(glBuffer, { id: ref.id, serial: 0 })
      this.buffer.set(ref.id, bufferRef)
    }
    return bufferRef
  }

  /**
   * @param {ResourceRef} resourceRef
   * @returns {ResourceRef} resource reference to WebGlBuffer
   */
  findBuffer (resourceRef) {
    return this.buffer.get(resourceRef.id)
  }

  /**
   * @param {ResourceRef} texRef - resource reference to texture
   * @returns {ResourceRef} resource reference to WebGlTexture
   */
  loadTexture (texRef) {
    let glTextureRef = this.texture.get(texRef.id)
    if (!glTextureRef) {
      // create WebGlTexture
      const glTex = new WebGlTexture(
        this.glx,
        texRef.resource.imgEl,
        texRef.hints.flipY,
        texRef.hints.repeatable,
        texRef.hints.premultiplyAlpha,
        texRef.hints.nearest
      )
      // create ResourceRef
      glTextureRef = new ResourceRef(glTex, { id: texRef.id, serial: 0 })
      this.texture.set(texRef.id, glTextureRef)
    }
    return glTextureRef
  }
}
