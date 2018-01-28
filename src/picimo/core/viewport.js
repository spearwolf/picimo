import AABB2 from './aabb2'

export default class Viewport extends AABB2 {
  /**
   * @param {number} x - x
   * @param {number} y - y
   * @param {number} width - width
   * @param {number} height - height
   */
  constructor (x, y, width, height) {
    super(x, (x + width), y, (y + height))
  }

  /**
   * @type {number}
   */
  get x () {
    return this.minX
  }

  /**
   * @param {number} x
   * @type {number}
   */
  set x (x) {
    const w = this.width

    /**
     * @type {number}
     */
    this.minX = x
    /**
     * @type {number}
     */
    this.maxX = x + w
  }

  /**
   * @type {number}
   */
  get y () {
    return this.minY
  }

  /**
   * @param {number} y
   * @type {number}
   */
  set y (y) {
    const h = this.height

    /**
     * @type {number}
     */
    this.minY = y
    /**
     * @type {number}
     */
    this.maxY = y + h
  }
}
