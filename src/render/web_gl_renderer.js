import eventize from '@spearwolf/eventize'

import ShaderContext from '../core/shader_context'

const autotouchBuffer = (renderer, resourceRef) => {
  const { resource } = resourceRef
  if (resource.enableAutotouch) {
    if (!renderer.autotouchResources.has(resourceRef.id)) {
      renderer.autotouchResources.set(resourceRef.id, true)
      resource.touch()
    }
  }
}

export default class WebGlRenderer {
  constructor (glx) {
    Object.defineProperty(this, 'glx', { value: glx })

    this.shaderContext = new ShaderContext()
    this.autotouchResources = new Map()
    this.frameNo = 0

    eventize(this)
  }

  renderFrame (scene) {
    ++this.frameNo
    this.shaderContext.clear()
    scene.emit('animateFrame', scene)
    this.beginRenderFrame()
    scene.emit('renderFrame', this)
    this.endRenderFrame()
  }

  beginRenderFrame () {
    this.clearFrameBuffer()
  }

  endRenderFrame () {
    this.autotouchResources.clear()
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
    program.loadUniforms(shaderContext, this)
    program.loadAttributes(shaderContext, this)
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
   * @param {string} primitive
   * @param {ElementIndexArray} elementIndexArray
   * @param {number} [count]
   * @param {number} [offset=0]
   */
  drawIndexed (primitive, elementIndexArray, count, offset = 0) {
    const { gl } = this.glx

    this.syncBuffer(elementIndexArray).bindBuffer()

    gl.drawElements(
      gl[primitive],
      count || elementIndexArray.length,
      gl.UNSIGNED_SHORT,
      offset * elementIndexArray.array.BYTES_PER_ELEMENT)
  }

  /**
   * @param {VOArray|ElementIndexArray} resource
   * @return {WebGlBuffer}
   */
  syncBuffer (resource) {
    const { resourceRef } = resource
    autotouchBuffer(this, resourceRef)

    const bufferRef = this.glx.resourceLibrary.loadBuffer(resourceRef)
    bufferRef.sync(resourceRef, buffer => buffer.bufferData(resourceRef.hints.typedArray))
    return bufferRef.resource
  }

  /**
   * @param {Texture} texture
   * @return {WebGlTexture}
   */
  syncTexture (texture) {
    const texRef = texture.resourceRef
    const glTexRef = this.glx.resourceLibrary.loadTexture(texRef)
    glTexRef.sync(texRef, tex => tex.uploadImageData())
    return glTexRef.resource
  }
}
