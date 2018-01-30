import tinycolor from 'tinycolor2'

const makeClearMask = (clearBuffer, color = false, depth = false, stencil = false) => {
  const { gl } = clearBuffer.glx
  let mask = color ? gl.COLOR_BUFFER_BIT : 0
  if (depth && clearBuffer.hasDepthBits) mask = mask | gl.DEPTH_BUFFER_BIT
  if (depth && clearBuffer.hasStencilBits) mask = mask | gl.STENCIL_BUFFER_BIT
  return mask
}

export default class ClearBuffer {
  constructor (glx) {
    this.glx = glx

    this.hasDepthBits = glx.DEPTH_BUFFER_BIT > 0
    this.hasStencilBits = glx.STENCIL_BUFFER_BIT > 0

    this.reset()
  }

  reset () {
    this.clearColor = null
    this.clearDepth = 1
    this.clearStencil = 0
    this.clearMask = 0
  }

  /**
   * Set the framebuffer clear color.
   * Use the *tinycolor* library for css color conversion.
   *
   * @param {string|object} col - css color definition (or _tinycolor2_ object)
   */
  setClearColor (col) {
    this.clearColor = col ? (typeof col === 'string' ? tinycolor(col) : col) : null
  }

  setClearMask (color, depth, stencil) {
    this.clearMask = makeClearMask(this, color, depth, stencil)
  }

  clear () {
    const { gl } = this.glx

    const { clearColor } = this
    if (clearColor) {
      const col = clearColor.toRgb()
      this.glx.clearColor(col.r / 255, col.g / 255, col.b / 255, col.a)
    } else {
      this.glx.clearColor(0, 0, 0, 0)
    }

    if (this.hasDepthBits) gl.clearDepth(this.clearDepth)
    if (this.hasStencilBits) gl.clearStencil(this.clearStencil)

    let mask = this.clearMask || makeClearMask(this, true, true, true)
    gl.clear(mask)
  }
}
