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
    this.renderBegin()
    scene.emit('syncBuffers', this)
    scene.emit('syncTextures', this)
    scene.emit('renderFrame', this)
    this.renderEnd()
  }

  renderBegin () {
    this.clearFrameBuffer()
  }

  renderEnd () {
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
   * @param {VOPool} voPool
   */
  syncBuffer (voPool) {
    const voArrayRef = voPool.voArray.resourceRef
    const bufferRef = this.glx.resourceLibrary.loadBuffer(voArrayRef)
    bufferRef.sync(voArrayRef, buffer => buffer.bufferData())
  }
}
