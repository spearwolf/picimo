
export default class WebGlBuffer {
  constructor (glx, target = WebGlBuffer.ARRAY_BUFFER, usage = WebGlBuffer.STATIC_DRAW) {
    this.glx = glx

    const { gl } = glx
    this.target = gl[target]
    this.usage = gl[usage]

    this.glBuffer = gl.createBuffer()

    this.voArray = null
    this.srcSerial = 0
  }

  bindBuffer () {
    this.glx.bindBuffer(this.target, this.glBuffer)
  }

  /**
   * Upload array buffer content to gpu via `g.bufferData(..)`.
   * Only sync buffer if `srcSerial` is *zero* or not equal than the *serial value* from the internal `voArray`.
   */
  bufferData () {
    const { srcSerial, voArray } = this
    if (srcSerial > 0 && srcSerial === voArray.serial.value) return

    this.bindBuffer()
    this.glx.gl.bufferData(this.target, voArray.float32Array, this.usage)

    this.srcSerial = voArray.serial.value
  }
}

WebGlBuffer.ARRAY_BUFFER = 'ARRAY_BUFFER'
WebGlBuffer.ELEMENT_ARRAY_BUFFER = 'ELEMENT_ARRAY_BUFFER'

WebGlBuffer.STATIC_DRAW = 'STATIC_DRAW'
WebGlBuffer.DYNAMIC_DRAW = 'DYNAMIC_DRAW'
