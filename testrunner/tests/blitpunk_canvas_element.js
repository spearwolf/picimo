/* eslint-env mocha */
/* global HTMLCanvasElement */
import { assert } from 'chai'

import initializeBlitpunk from 'blitpunk'

const bContainer = document.querySelector('.blitpunk')

describe('<blitpunk-canvas>', () => {
  before(initializeBlitpunk)

  describe('after adding a new <blitpunk-canvas> element to html', () => {
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

    it('the element should have a .canvas property', () => {
      assert.isOk(bCanvas.canvas)
    })

    it('.canvas is a html canvas element', () => {
      assert.instanceOf(bCanvas.canvas, HTMLCanvasElement)
    })
  })
})
