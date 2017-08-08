/* eslint-env mocha */
/* global HTMLCanvasElement */
import { assert } from 'chai'
import sinon from 'sinon'

import 'src/blitpunk.js'

import CanvasElement from 'src/dom/elements/CanvasElement'
import WebGlContext from 'src/render/web_gl_context'
import WebGlRenderer from 'src/render/web_gl_renderer'

import { DOM_ELEM_CANVAS } from 'src/dom/constants'

describe(`<${DOM_ELEM_CANVAS} />`, () => {
  let blitpunkCanvas

  before(() => {
    sinon.spy(window, 'requestAnimationFrame')
    blitpunkCanvas = document.createElement(DOM_ELEM_CANVAS)
    document.body.appendChild(blitpunkCanvas)
  })

  after(() => {
    window.requestAnimationFrame.restore()
  })

  it('should be an instance of CanvasElement', () => {
    assert.instanceOf(blitpunkCanvas, CanvasElement)
  })

  describe('after dom insertion', () => {
    it('should have a <canvas/> element', () => {
      assert.isOk(blitpunkCanvas.canvas)
      assert.instanceOf(blitpunkCanvas.canvas, HTMLCanvasElement)
    })
    it('.time should initialize with 0', () => {
      assert.equal(blitpunkCanvas.time, 0)
    })
    it('.frameNo should initialize with 0', () => {
      assert.equal(blitpunkCanvas.frameNo, 0)
    })
    it('.startTime should be a number', () => {
      assert.typeOf(blitpunkCanvas.startTime, 'number')
    })
    it('.glx should be an instance of WebGlContext', () => {
      assert.instanceOf(blitpunkCanvas.glx, WebGlContext)
    })
    it('.renderer should be an instance of WebGlRenderer', () => {
      assert.instanceOf(blitpunkCanvas.renderer, WebGlRenderer)
    })
    it('requestAnimationFrame() should has been called', () => {
      assert.isTrue(window.requestAnimationFrame.calledOnce)
    })
    it('.width should be a number', () => {
      assert.typeOf(blitpunkCanvas.width, 'number')
    })
    it('.width should be greater than zero', () => {
      assert.isTrue(blitpunkCanvas.width > 0)
    })
    it('.height should be a number', () => {
      assert.typeOf(blitpunkCanvas.height, 'number')
    })
    it('.height should be greater than zero', () => {
      assert.isTrue(blitpunkCanvas.height > 0)
    })
  })

  describe('renderFrame', () => {
    it('increases .frameNo', () => {
      const { frameNo } = blitpunkCanvas
      blitpunkCanvas.blitpunk.renderFrame()
      assert.equal(frameNo + 1, blitpunkCanvas.frameNo)
    })

    it('triggers blitpunkCanvas -> renderFrame(renderer) event', () => {
      const stub = sinon.stub()
      blitpunkCanvas.on('renderFrame', stub)
      assert.isFalse(stub.calledOnce)
      blitpunkCanvas.blitpunk.renderFrame()
      assert.isTrue(stub.calledOnce)
      assert.isTrue(stub.calledWith(blitpunkCanvas.renderer),
        'called renderFrame() with .renderer as first argument')
    })
  })

  describe('removing from dom', () => {
    let spy

    before(() => {
      spy = sinon.spy(window, 'cancelAnimationFrame')
    })

    after(() => spy.restore())

    it('should cancel raf subscription', () => {
      assert.isFalse(spy.calledOnce)
      document.body.removeChild(blitpunkCanvas)
      assert.isTrue(spy.calledOnce)
    })
  })
})
