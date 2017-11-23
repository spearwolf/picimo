/* eslint-env mocha */
/* global HTMLCanvasElement */
import whenReady from 'blitpunk'

import { assert } from 'chai'
import sinon from 'sinon'

import CanvasElement from 'blitpunk/dom/elements/CanvasElement'
import WebGlContext from 'blitpunk/render/web_gl_context'
import WebGlRenderer from 'blitpunk/render/web_gl_renderer'

import { DOM_ELEM_CANVAS } from 'blitpunk/dom/constants'

describe(`<${DOM_ELEM_CANVAS} />`, () => {
  let blitpunkCanvas

  before(async () => {
    sinon.spy(window, 'requestAnimationFrame')
    blitpunkCanvas = document.createElement(DOM_ELEM_CANVAS)
    document.body.appendChild(blitpunkCanvas)
    await whenReady()
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
    it('.startTime should be a number', () => {
      assert.typeOf(blitpunkCanvas.startTime, 'number')
    })
    it('.glx should be an instance of WebGlContext', () => {
      assert.instanceOf(blitpunkCanvas.glx, WebGlContext)
    })
    it('.renderer should be an instance of WebGlRenderer', () => {
      assert.instanceOf(blitpunkCanvas.renderer, WebGlRenderer)
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
