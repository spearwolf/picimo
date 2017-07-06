/* eslint-env mocha */
/* global HTMLCanvasElement */
import { assert } from 'chai'
import sinon from 'sinon'

import '../src/blitpunk.js'

import BlitpCanvas from '../src/dom/blitp_canvas.js'
import WebGlContext from '../src/render/web_gl_context'
import WebGlRenderer from '../src/render/web_gl_renderer'
import SGCanvas from '../src/scene_graph/s_g_canvas'

import { BLITP_CANVAS_ELEMENT } from '../src/dom/constants'

describe('<blitp-canvas />', () => {
  let blitpCanvas

  before(() => {
    sinon.spy(window, 'requestAnimationFrame')

    blitpCanvas = document.createElement(BLITP_CANVAS_ELEMENT)
    document.body.appendChild(blitpCanvas)
  })

  after(() => {
    window.requestAnimationFrame.restore()
  })

  it('should be an instance of BlitpCanvas', () => {
    assert.instanceOf(blitpCanvas, BlitpCanvas)
  })

  describe('after dom insertion', () => {
    it('should have a <canvas/> element', () => {
      assert.isOk(blitpCanvas.canvas)
      assert.instanceOf(blitpCanvas.canvas, HTMLCanvasElement)
    })
    it('.time should initialize with 0', () => {
      assert.equal(blitpCanvas.time, 0)
    })
    it('.frameNo should initialize with 0', () => {
      assert.equal(blitpCanvas.frameNo, 0)
    })
    it('.startTime should be a number', () => {
      assert.typeOf(blitpCanvas.startTime, 'number')
    })
    it('.glx should be an instance of WebGlContext', () => {
      assert.instanceOf(blitpCanvas.glx, WebGlContext)
    })
    it('.renderer should be an instance of WebGlRenderer', () => {
      assert.instanceOf(blitpCanvas.renderer, WebGlRenderer)
    })
    it('.sgNode should be an instance of SGCanvas', () => {
      assert.instanceOf(blitpCanvas.sgNode, SGCanvas)
    })
    it('requestAnimationFrame() should has been called', () => {
      assert.isTrue(window.requestAnimationFrame.calledOnce)
    })
    it('.width should be a number', () => {
      assert.typeOf(blitpCanvas.width, 'number')
    })
    it('.width should be greater than zero', () => {
      assert.isTrue(blitpCanvas.width > 0)
    })
    it('.height should be a number', () => {
      assert.typeOf(blitpCanvas.height, 'number')
    })
    it('.height should be greater than zero', () => {
      assert.isTrue(blitpCanvas.height > 0)
    })
  })

  describe('renderFrame', () => {
    it('increases .frameNo', () => {
      const { frameNo } = blitpCanvas
      blitpCanvas.renderFrame()
      assert.equal(frameNo + 1, blitpCanvas.frameNo)
    })

    it('calls blitpCanvas.sgNode.renderFrame()', () => {
      const spy = sinon.spy(blitpCanvas.sgNode, 'renderFrame')
      assert.isFalse(spy.calledOnce)
      blitpCanvas.renderFrame()
      assert.isTrue(spy.calledOnce)
      assert.isTrue(spy.calledWith(blitpCanvas.renderer),
        'called renderFrame() with .renderer as first argument')
      spy.restore()
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
      document.body.removeChild(blitpCanvas)
      assert.isTrue(spy.calledOnce)
    })
  })
})
