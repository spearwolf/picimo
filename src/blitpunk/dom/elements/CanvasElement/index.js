import EntityElement from '../EntityElement'
import resize from './resize'
import createWebGlRenderer from './createWebGlRenderer'

const tinycolor = require('tinycolor2')

export default class CanvasElement extends EntityElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)

    console.log('[CanvasElement] constructor, self=', self)

    self.now = 0
    self.animationFrameRequestId = 0
    self.animationFrameRequestIsStopped = false

    Object.defineProperties(self, {
      _webGlRenderer: { value: null, writable: true },
      _clearColor: { value: undefined, writable: true }
    })

    self.canvas = document.createElement('canvas')
    self.appendChild(self.canvas)
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

  get clearColor () {
    return this._clearColor || this.entity.queryComponent('clear-color', cc => cc.color)
  }

  set clearColor (color) {
    this._clearColor = color ? tinycolor(color) : null
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
        webGlRenderer.clearColor = this.clearColor
        webGlRenderer.updateViewport(0, 0, this.width, this.height)
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
    console.log('[CanvasElement] connectedCallback()')

    resize(this)
    this.startAnimation()
  }

  /** @private */
  disconnectedCallback () {
    console.log('[CanvasElement] disconnectedCallback()')

    this.stopAnimation()
  }
}
