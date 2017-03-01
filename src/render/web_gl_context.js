import WebGlResourceLibrary from './web_gl_resource_library'

export default class WebGlContext {

  constructor (gl) {
    Object.defineProperty(this, 'gl', { value: gl })

    this.resourceLibrary = new WebGlResourceLibrary(this)
    this.boundBuffers = new Map()
    this.currentProgram = 0
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
  }

  bindBuffer (target, buffer) {
    if (this.boundBuffers.get(target) !== buffer) {
      this.gl.bindBuffer(target, buffer)
      this.boundBuffers.set(target, buffer)
    }
  }

  useProgram (glProgram) {
    if (this.currentProgram !== glProgram) {
      this.gl.useProgram(glProgram)
      this.currentProgram = glProgram
    }
  }

}

