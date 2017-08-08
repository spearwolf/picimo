
export default class WebGlTexture {
  /**
   * @param {WebGlContext} glx
   * @param {HTMLImageElement} imgEl
   * @param {boolean} [flipY=false]
   * @param {boolean} [repeatable=false]
   * @param {boolean} [premultiplyAlpha=false]
   * @param {boolean} [nearest=false]
   */
  constructor (glx, imgEl, flipY = false, repeatable = false, premultiplyAlpha = false, nearest = false) {
    this.glx = glx
    this.imgEl = imgEl

    this.flipY = flipY
    this.repeatable = repeatable
    this.premultiplyAlpha = premultiplyAlpha
    this.nearest = nearest

    this.isInitialized = false
    this.glTexObj = glx.gl.createTexture()
    this.texUnit = -1
  }

  bind () {
    return this.glx.textureManager.bindWebGlTexture(this)
  }

  uploadImageData () {
    if (this.imgEl == null) return
    if (!this.isInitialized) {
      initialize(this)
      this.isInitialized = true
    }

    this.bind()

    const { gl } = this.glx
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.imgEl)
  }
}

function initialize (tex) {
  tex.bind()

  const { gl } = tex.glx

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, tex.flipY)
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, tex.premultiplyAlpha)

  const wrap = tex.repeatable ? gl.REPEAT : gl.CLAMP_TO_EDGE
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap)

  const filter = tex.nearest ? gl.NEAREST : gl.LINEAR
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, tex.imgEl.width, tex.imgEl.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
}
