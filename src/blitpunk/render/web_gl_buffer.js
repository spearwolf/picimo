
export default class WebGlBuffer {
  constructor (glx, target = WebGlBuffer.ARRAY_BUFFER, usage = WebGlBuffer.STATIC_DRAW) {
    this.glx = glx

    const { gl } = glx
    this.target = gl[target]
    this.usage = gl[usage]

    this.glBuffer = gl.createBuffer()
  }

  bindBuffer () {
    this.glx.bindBuffer(this.target, this.glBuffer)
  }

  /**
   * Upload array buffer content to gpu via `g.bufferData(..)`.
   */
  bufferData (typedArray) {
    this.bindBuffer()
    this.glx.gl.bufferData(this.target, typedArray, this.usage)
  }
}

WebGlBuffer.ARRAY_BUFFER = 'ARRAY_BUFFER'
WebGlBuffer.ELEMENT_ARRAY_BUFFER = 'ELEMENT_ARRAY_BUFFER'

WebGlBuffer.STATIC_DRAW = 'STATIC_DRAW'
WebGlBuffer.DYNAMIC_DRAW = 'DYNAMIC_DRAW'