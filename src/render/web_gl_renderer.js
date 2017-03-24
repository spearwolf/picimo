import eventize from '@spearwolf/eventize'

import ShaderContext from '../core/shader_context'

export default class WebGlRenderer {
  constructor (glx) {
    Object.defineProperty(this, 'glx', { value: glx })

    this.shaderContext = new ShaderContext()

    eventize(this)
  }

  renderFrame (scene) {
    this.shaderContext.clear()
    scene.emit('animateFrame', scene)
    this.beginRenderFrame()
    scene.emit('syncBuffers', this)
    scene.emit('syncTextures', this)
    scene.emit('renderFrame', this)
    this.endRenderFrame()
  }

  beginRenderFrame () {
    this.clearFrameBuffer()
  }

  endRenderFrame () {
    // TODO
  }

  clearFrameBuffer () {
    const { gl } = this.glx

    let clear = gl.COLOR_BUFFER_BIT
    if (this.glx.DEPTH_BITS > 0) clear = clear | gl.DEPTH_BUFFER_BIT

    gl.clear(clear)
  }

  /**
   * @param {ShaderProgram} shaderProgram
   */
  useShaderProgram (shaderProgram) {
    const program = this.glx.resourceLibrary.loadProgram(shaderProgram)
    const { shaderContext } = this
    program.use(shaderContext)
    program.loadUniforms(shaderContext)
    program.loadAttributes(shaderContext)
  }

  /**
   * @param {string} primitive
   * @param {number} count
   * @param {number} [startIndex=0]
   */
  drawArrays (primitive, count, startIndex = 0) {
    const { gl } = this.glx
    gl.drawArrays(gl[primitive], startIndex, count)
  }

  /**
   * @param {VOArray|ElementIndexArray} resource
   */
  syncBuffer (resource) {
    // TODO delay sync until buffer is really used by draw commands aka drawArrays()
    const { resourceRef } = resource
    const bufferRef = this.glx.resourceLibrary.loadBuffer(resourceRef)
    bufferRef.sync(resourceRef, buffer => buffer.bufferData(resourceRef.hints.typedArray))
  }

  /**
   * @param {Texture} texture
   */
  syncTexture (texture) {
    // TODO delay sync until texture is really used by draw commands aka drawArrays()
    const texRef = texture.resourceRef
    const glTexRef = this.glx.resourceLibrary.loadTexture(texRef)
    glTexRef.sync(texRef, tex => tex.uploadImageData())
  }
}
