/* eslint-env mocha */
/* global BLITPUNK HTMLCanvasElement */
import { assert } from 'chai'

const bContainer = document.querySelector('.blitpunk')

describe('<blitpunk-canvas>', () => {
  before(BLITPUNK.initialize)

  describe('after adding a new <blitpunk-canvas> element to the dom', () => {
    let bCanvas

    beforeEach(() => {
      bCanvas = document.createElement('blitpunk-canvas')
      bContainer.appendChild(bCanvas)
    })

    afterEach(() => {
      if (bCanvas) {
        bContainer.removeChild(bCanvas)
      }
    })

    it('should have .canvas property', () => {
      assert.isOk(bCanvas.canvas)
    })

    it('.canvas is a html canvas element', () => {
      assert.instanceOf(bCanvas.canvas, HTMLCanvasElement)
    })
  })
})
