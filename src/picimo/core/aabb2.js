const posNum = num => num < 0 ? 0 : num

/**
 * Represents a 2d axis aligned boundary box.
 *
 * @class AABB2
 * @param {number} [x0=0] - x0
 * @param {number} [x1=0] - x1
 * @param {number} [y0=0] - y0
 * @param {number} [y1=0] - y1
 */

export default class AABB2 {
  constructor (x0 = 0, x1 = 0, y0 = 0, y1 = 0) {
    if (x0 < x1) {
      /**
       * @type {number}
       */
      this.minX = x0
      /**
       * @type {number}
       */
      this.maxX = x1
    } else {
      /**
       * @type {number}
       */
      this.minX = x1
      /**
       * @type {number}
       */
      this.maxX = x0
    }

    if (y0 < y1) {
      /**
       * @type {number}
       */
      this.minY = y0
      /**
       * @type {number}
       */
      this.maxY = y1
    } else {
      /**
       * @type {number}
       */
      this.minY = y1
      /**
       * @type {number}
       */
      this.maxY = y0
    }
  }

  /**
   * @type {number}
   */
  get width () {
    return posNum(this.maxX - this.minX + 1)
  }

  /**
   * @type {number}
   */
  get height () {
    return posNum(this.maxY - this.minY + 1)
  }

  /**
   * @type {number}
   */
  get centerX () {
    return posNum((this.maxX - this.minX) / 2)
  }

  /**
   * @type {number}
   */
  get centerY () {
    return posNum((this.maxY - this.minY) / 2)
  }

  /**
   * Extend the boundary box.
   *
   * @param {number} x - x
   * @param {number} y - y
   */
  addPoint (x, y) {
    if (x < this.minX) {
      this.minX = x
    } else if (x > this.maxX) {
      this.maxX = x
    }

    if (y < this.minY) {
      this.minY = y
    } else if (y > this.maxY) {
      this.maxY = y
    }
  }

  /**
   * Determinates wether or the 2d point is inside this AABB.
   *
   * @param {number} x - x
   * @param {number} y - y
   * @return {boolean} return true when point is inside the aabb
   */
  isInside (x, y) {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY
  }

  /**
   * Determinates wether or not this AABB intersects *aabb*.
   *
   * @param {AABB2} aabb - aabb
   * @return {boolean} return true when there is some intersection between both
   */
  isIntersection (aabb) {
    return !(
      aabb.maxX < this.minX ||
      aabb.minX > this.maxX ||
      aabb.maxY < this.minY ||
      aabb.minY > this.maxY
    )
  }
}
