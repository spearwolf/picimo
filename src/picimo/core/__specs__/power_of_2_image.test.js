/* eslint-env mocha */
import assert from 'assert'
import testAssetUrl from 'test/testAssetUrl'
import PowerOf2Image from 'picimo/core/power_of_2_image'

describe('PowerOf2Image', function () {
  describe('should load image from given url', function () {
    const p2img = new PowerOf2Image(testAssetUrl('nobinger.png'))
    let promiseResult
    before('after complete', function (done) {
      p2img.complete.then(function (img) {
        promiseResult = img
        done()
      })
    })

    it('complete promise should return the PowerOf2Image instance', () => assert.equal(p2img, promiseResult))
    it('width', () => assert.equal(p2img.width, 128))
    it('height', () => assert.equal(p2img.height, 256))
    it('origWidth', () => assert.equal(p2img.origWidth, 128))
    it('origHeight', () => assert.equal(p2img.origHeight, 256))
    it('isComplete', () => assert.equal(p2img.isComplete, true))
    it('imgEl', () => assert(p2img.imgEl instanceof window.HTMLImageElement))
  })

  describe('should load image from HTMLImageElement', function () {
    const img = new window.Image()
    img.src = '/base/test/assets/nobinger.png'
    let origWidth
    let origHeight
    img.onload = () => {
      origWidth = img.width
      origHeight = img.height
    }
    const p2img = new PowerOf2Image(img)
    before('after complete', function (done) { p2img.complete.then(() => done()) })

    it('should have been called previous onload image handler', () => assert.equal(typeof origWidth, 'number'))
    it('original width', () => assert.equal(origWidth, 128))
    it('original height', () => assert.equal(origHeight, 256))
    it('width', () => assert.equal(p2img.width, 128))
    it('height', () => assert.equal(p2img.height, 256))
    it('isComplete', () => assert.equal(p2img.isComplete, true))
    it('imgEl', () => assert(p2img.imgEl instanceof window.HTMLImageElement))
  })

  describe('should convert non-power-of-2 image', function () {
    const p2img = new PowerOf2Image(testAssetUrl('bird-chicken-penguin.png'))
    before('after complete', function (done) { p2img.complete.then(() => done()) })

    it('width', () => assert.equal(p2img.width, 1024))
    it('height', () => assert.equal(p2img.height, 512))
    it('origWidth', () => assert.equal(p2img.origWidth, 640))
    it('origHeight', () => assert.equal(p2img.origHeight, 480))
    it('imgEl', () => assert(p2img.imgEl instanceof window.HTMLCanvasElement))
  })
})