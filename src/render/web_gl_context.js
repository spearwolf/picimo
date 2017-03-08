import WebGlResourceLibrary from './web_gl_resource_library'

export default class WebGlContext {
  constructor (gl) {
    Object.defineProperty(this, 'gl', { value: gl })

    initialize(this)

    this.resourceLibrary = new WebGlResourceLibrary(this)
    this.boundBuffers = new Map()
    this.currentProgram = 0
    this.enabledVertexAttribLocations = []
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
}
