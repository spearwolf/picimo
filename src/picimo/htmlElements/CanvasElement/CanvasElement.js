import { defineHiddenPropertiesRW } from 'picimo/utils'
import { ShaderUniformVariable } from 'picimo/core'

import EntityElement from '../EntityElement'

import { UNIFORM_TIME, UNIFORM_RESOLUTION } from '../constants'

import createWebGlRenderer from './createWebGlRenderer'
import resize from './resize'

export default class CanvasElement extends EntityElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)

    self.now = 0
    self.frameNo = 0
    self.animationFrameRequestId = 0
    self.animationFrameRequestIsStopped = false

    self.timeUniform = new ShaderUniformVariable(UNIFORM_TIME)
    self.resolutionUniform = new ShaderUniformVariable(UNIFORM_RESOLUTION)

    defineHiddenPropertiesRW(self, {
      _webGlRenderer: null,
      _clearColor: undefined,
      _lastFrameTime: 0
    })

    self.canvas = document.createElement('canvas')
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

        ++this.frameNo
        this.now = now / 1000.0 // seconds
        this.timeUniform.value = this.now
        this.timeFrameOffset = this.now - this._lastFrameTime
        this._lastFrameTime = this.now

        resize(this)
        const { webGlRenderer } = this
        webGlRenderer.setViewport(0, 0, this.width, this.height)
        webGlRenderer.renderFrame(() => {
          const { shaderContext } = webGlRenderer
          shaderContext.pushVar(this.timeUniform)
          shaderContext.pushVar(this.resolutionUniform)

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
    if (this.firstTimeConnected) {
      this.firstTimeConnected = false
      this.appendChild(this.canvas)
    }
    resize(this)
    this.startAnimation()
  }

  /** @private */
  disconnectedCallback () {
    this.stopAnimation()
  }
}
