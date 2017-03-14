import { isPowerOf2, findNextPowerOf2 } from '../utils/math_helpers'

/**
 * Represents a `<img>` or `<canvas>` element which sizes (width and height) are
 * always power of 2.
 */
export default class PowerOf2Image {
  /**
   * If image dimension is NOT power of 2 then create a new `<canvas>`
   * (with power of 2 dimension) and copy the original image content onto it.
   * Since fetching imge data from server is a *async* operation the `imgEl` property
   * can be `null` right after object construction and will be set later after
   * image is loaded (and possible converted).
   *
   * @param {string|HTMLImageElement|HTMLCanvasElement} image - url or html *image* element
   */
  constructor (image) {
    let imgEl
    if (typeof image === 'string') {
      imgEl = new window.Image()
      imgEl.src = image
    } else {
      imgEl = image
    }
    if (imgEl.width === 0 && imgEl.height === 0) {
      /**
       * @type {HTMLImageElement|HTMLCanvasElement}
       */
      this.imgEl = null
      /**
       * @type {Promise<PowerOf2Image>}
       */
      this.complete = new Promise(resolve => {
        const origOnLoad = imgEl.onload
        imgEl.onload = () => {
          if (origOnLoad) origOnLoad.call(imgEl)
          this.imgEl = isPowerOf2(imgEl.width) && isPowerOf2(imgEl.height) ? imgEl : convertToPowerOf2(imgEl)
          this.origWidth = imgEl.width
          this.origHeight = imgEl.height
          resolve(this)
        }
      })
    } else {
      /**
       * @type {HTMLImageElement|HTMLCanvasElement}
       */
      this.imgEl = isPowerOf2(image.width) && isPowerOf2(image.height)
        ? image
        : convertToPowerOf2(image)

      /**
       * @type {number}
       */
      this.origWidth = image.width
      /**
       * @type {number}
       */
      this.origHeight = image.height

      /**
       * @type {Promise<PowerOf2Image>}
       */
      this.complete = Promise.resolve(this)
    }
  }

  /**
   * A boolean that is `true` if the image has loaded and possible converted.
   * @type {boolean}
   */
  get isComplete () {
    return this.imgEl != null
  }

  /**
   * Returns image width or `0` if image loading is not finished.
   * @type {number}
   */
  get width () {
    return (this.imgEl && this.imgEl.width) || 0
  }

  /**
   * Returns image height or `0` if image loading is not finished.
   * @type {number}
   */
  get height () {
    return (this.imgEl && this.imgEl.height) || 0
  }
}

function convertToPowerOf2 (image) {
  const w = findNextPowerOf2(image.width)
  const h = findNextPowerOf2(image.height)

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  canvas.getContext('2d').drawImage(image, 0, 0)

  return canvas
}
