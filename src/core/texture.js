
export default class Texture {
  /**
   * @param {Texture|HTMLImageElement|HTMLCanvasElement} source
   * @param {number} [width]
   * @param {number} [height]
   * @param {number} [x=0]
   * @param {number} [y=0]
   */
  constructor (source, width, height, x = 0, y = 0) {
    if (source instanceof Texture) {
      /**
       * @type {Texture}
       */
      this.parent = source
      /**
       * @type {HTMLImageElement|HTMLCanvasElement}
       */
      this.image = null
    } else if (typeof source === 'object' && 'width' in source && 'height' in source) {
      /**
       * @type {HTMLImageElement|HTMLCanvasElement}
       */
      this.image = source
      /**
       * @type {Texture}
       */
      this.parent = null
    } else {
      throw new Error('new Texture() panic: blank source argument!')
    }

    this._width = width
    this._height = height

    /**
     * @type {number}
     */
    this.x = x
    /**
     * @type {number}
     */
    this.y = y
  }

  /**
   * @type {Texture}
   */
  get root () {
    return (this.parent && this.parent.root) || this
  }

  /**
   * @type {number}
   */
  get width () {
    return (typeof this._width === 'number'
      ? this._width
      : (this.image
        ? this.image.width
        : (this.parent
          ? this.root.width
          : 0
        )
      )
    )
  }

  set width (w) {
    this._width = w
  }

  /**
   * @type {number}
   */
  get height () {
    return (typeof this._height === 'number'
      ? this._height
      : (this.image
        ? this.image.height
        : (this.parent
          ? this.root.height
          : 0
        )
      )
    )
  }

  set height (h) {
    this._height = h
  }

  /**
   * @type {number}
   */
  get minS () {
    let x = this.x
    let texture = this

    while ((texture = texture.parent) != null) {
      x += texture.x
    }

    return x / this.root.image.width
  }

  /**
   * @type {number}
   */
  get minT () {
    let y = this.y
    let texture = this

    while ((texture = texture.parent) != null) {
      y += texture.y
    }

    return y / this.root.image.height
  }

  /**
   * @type {number}
   */
  get maxS () {
    let x = this.x + this.width
    let texture = this

    while ((texture = texture.parent) != null) {
      x += texture.x
    }

    return x / this.root.image.width
  }

  /**
   * @type {number}
   */
  get maxT () {
    let y = this.y + this.height
    let texture = this

    while ((texture = texture.parent) != null) {
      y += texture.y
    }

    return y / this.root.image.height
  }
}
