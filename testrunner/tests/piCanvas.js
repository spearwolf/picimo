/* eslint-env mocha */
/* global HTMLCanvasElement */
import { assert } from 'chai'

import initializePicimo from 'picimo'

const bContainer = document.querySelector('.picimo')

describe('<pi-canvas>', () => {
  before(initializePicimo)

  describe('after adding a new <pi-canvas> element to html', () => {
    let bCanvas

    beforeEach(() => {
      bCanvas = document.createElement('pi-canvas')
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