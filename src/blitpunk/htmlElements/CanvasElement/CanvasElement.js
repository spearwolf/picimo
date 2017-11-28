import { debug } from 'common/log'

import EntityElement from '../EntityElement'

import createWebGlRenderer from './createWebGlRenderer'
import resize from './resize'

export default class CanvasElement extends EntityElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)

    debug('[canvas] constructor, self=', self)

    self.now = 0
    self.animationFrameRequestId = 0
    self.animationFrameRequestIsStopped = false

    Object.defineProperties(self, {
      _webGlRenderer: { value: null, writable: true },
      _clearColor: { value: undefined, writable: true }
    })

    self.canvas = document.createElement('canvas')
    // self.appendChild(self.canvas)
    self.firstTimeConnected = true
    resize(self)

    return self
  }

  get webGlRenderer () {
    const renderer = this._webGlRenderer
    if (renderer) return renderer
    const { webGlRenderer, canvasContextAttributes } = createWebGlRenderer(this)
    this.canvasContextAttributes = canvasContextAttributes
    this._webGlRenderer = webGlRenderer
    return webGlRenderer
  }

  startAnimation () {
    if (this.animationFrameRequestId) return
    this.animationFrameRequestIsStopped = false
    this.animationFrameRequestId = window.requestAnimationFrame((now) => {
      this.animationFrameRequestId = 0
      if (!this.animationFrameRequestIsStopped) {
        this.startAnimation()
        this.now = now / 1000.0 // seconds
        resize(this)
        const { webGlRenderer } = this
        webGlRenderer.setViewport(0, 0, this.width, this.height)
        webGlRenderer.renderFrame(() => {
          this.renderFrame(this, webGlRenderer)
        })
      }
    })
  }

  stopAnimation () {
    this.animationFrameRequestIsStopped = true
    if (this.animationFrameRequestId !== 0) {
      window.cancelAnimationFrame(this.animationFrameRequestId)
      this.animationFrameRequestId = 0
    }
  }

  /** @private */
  connectedCallback () {
    debug('[canvas] connectedCallback()')

    if (this.firstTimeConnected) {
      this.firstTimeConnected = false
      this.appendChild(this.canvas)
    }
    resize(this)
    this.startAnimation()
  }

  /** @private */
  disconnectedCallback () {
    debug('[canvas] disconnectedCallback()')

    this.stopAnimation()
  }
}
