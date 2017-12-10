import AABB2 from './aabb2'

const posNum = num => num < 0 ? 0 : num

export default class Viewport extends AABB2 {
  /**
   * @param {number} x - x
   * @param {number} y - y
   * @param {number} width - width
   * @param {number} height - height
   */
  constructor (x, y, width, height) {
    const minX = parseInt(x, 10)
    const minY = parseInt(y, 10)

    super(
      minX, posNum((minX + parseInt(width, 10) - 1)),
      minY, posNum((minY + parseInt(height, 10) - 1))
    )
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
    this.maxX = posNum(x + w - 1)
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
    this.maxY = posNum(y + h - 1)
  }

  /**
   * @type {number}
   */
  get width () {
    return posNum(this.maxX - this.minX + 1)
  }

  /**
   * @param {number} y
   * @type {number}
   */
  set width (w) {
    /**
     * @type {number}
     */
    this.maxX = posNum(this.minX + w - 1)
  }

  /**
   * @type {number}
   */
  get height () {
    return posNum(this.maxY - this.minY + 1)
  }

  /**
   * @param {number} y
   * @type {number}
   */
  set height (h) {
    /**
     * @type {number}
     */
    this.maxY = posNum(this.minY + h - 1)
  }
}
