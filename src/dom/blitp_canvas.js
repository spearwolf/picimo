/* global HTMLElement */
import eventize from '@spearwolf/eventize'

// import BlitpElement from './blitp_element'
import WebGlContext from '../render/web_gl_context'
import WebGlRenderer from '../render/web_gl_renderer'
import SGCanvas from '../scene_graph/s_g_canvas'

import { BLITP_CANVAS_NODE_NAME } from './constants'

const now = () => window.performance.now() / 1000

/**
 * The **custom HTML `<blitp-canvas></blitp-canvas>` element** represents the *webgl* canvas,
 * which acts also as the main API entrypoint for every *blitpunk* application.
 *
 * The size of the html element should be defined by css styles (eg. `display: block; width: 100%; height: 100%`) &mdash; without
 * any styles (or `display: inline`) the canvas will mimic the size of the parent element.
 *
 * You can customize the wegl context by specifying html attributes:
 * - `alpha`
 * - `depth`
 * - `stencil`
 * - `antialias`
 * - `premultipliedAlpha`
 * - `preserveDrawingBuffer`
 *
 * _ATTENTION:_ changing these html attributes has no effect *after* the webgl context is initialized!
 *
 * @example
 * <!DOCTYPE html>
 * <html>
 * <head>
 *   <title>fullscreen blitpunk canvas example</title>
 *   <meta name="viewport" content="width=device-width,initial-scale=1.0">
 *   <style>
 *     html, body {
 *       margin: 0;
 *       overflow: hidden;
 *       width: 100%;
 *       height: 100%;
 *     }
 *   </style>
 * </head>
 * <body>
 *   <blitp-canvas alpha antialias>
 *     ...
 *   </blitp-canvas>
 *   ...
 */
export default class BlitpCanvas extends HTMLElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)
    return eventize(self)
  }

  get blitpNodeName () {
    return BLITP_CANVAS_NODE_NAME
  }

  static get observedAttributes () {
    return ['clear-color']
  }

  /** @private */
  connectedCallback () {
    /**
     * @type {CanvasHTMLElement}
     */
    this.canvas = document.createElement('canvas')

    /**
     * The initial attributes used to create the webgl context
     * @type {Object}
     * @see https://developer.mozilla.org/de/docs/Web/API/HTMLCanvasElement/getContext
     */
    this.contextAttributes = Object.freeze({
      alpha: this.hasAttribute('alpha'),
      depth: this.hasAttribute('depth'),
      stencil: this.hasAttribute('stencil'),
      antialias: this.hasAttribute('antialias'),
      premultipliedAlpha: this.hasAttribute('premultipliedAlpha'),
      preserveDrawingBuffer: this.hasAttribute('preserveDrawingBuffer')
    })

    /**
     * Seconds since `<blitp-canvas>` startup
     * @type {number}
     */
    this.time = 0

    /**
     * Startup time in seconds.
     * @type {number}
     */
    this.startTime = now()

    /**
     * Frame counter since application startup
     * @type {number}
     */
    this.frameNo = 0

    /**
     * @type {WebGlContext}
     */
    this.glx = new WebGlContext(createGlContext(this.canvas, this.contextAttributes))

    /**
     * @type {WebGlRenderer}
     */
    this.renderer = new WebGlRenderer(this.glx)

    /**
     * @type {SGCanvas}
     */
    this.sgNode = new SGCanvas()
    this.on(this.sgNode)

    const clearColor = this.getAttribute('clear-color')
    if (clearColor) {
      this.renderer.setClearColor(clearColor)
    }

    // setCanvasStyles(this.canvas)
    this.appendChild(this.canvas)

    this.resize()

    // autostart animation loop by default
    this.requestAnimate()
  }

  disconnectedCallback () {
    window.cancelAnimationFrame(this.rafSubscription)
  }

  attributeChangedCallback (attr, oldValue, newValue) {
    if (attr === 'clear-color') {
      if (this.renderer) {
        this.renderer.setClearColor(newValue)
      }
    }
  }

  requestAnimate () {
    this.rafSubscription = window.requestAnimationFrame(() => this.animate())
  }

  /**
   * Start the main animation loop.
   */
  animate () {
    this.renderFrame()
    this.requestAnimate()
  }

  /**
   * Render the frame.
   */
  renderFrame () {
    ++this.frameNo
    this.time = now() - this.startTime
    this.resize()
    this.renderer.renderFrame(this)
  }

  /**
   * Resize the canvas dom element to the same size as the `<blitp-canvas>.parentNode`
   */
  resize () {
    const style = window.getComputedStyle(this, null)
    const el = style.display === 'inline' ? this.parentNode : this

    const { canvas } = this
    const dpr = window.devicePixelRatio || 1

    let wPx = el.clientWidth
    let hPx = el.clientHeight

    canvas.style.width = wPx + 'px'
    canvas.style.height = hPx + 'px'

    const w = Math.round(wPx * dpr)
    const h = Math.round(hPx * dpr)

    if (w !== canvas.width || h !== canvas.height) {
      canvas.width = w
      canvas.height = h
    }

    if (w !== this.width || h !== this.height) {
      /**
       * Canvas size in _device_ pixels.
       * @type {number}
       */
      this.width = w
      /**
       * Canvas size in _device_ pixels.
       * @type {number}
       */
      this.height = h

      this.glx.gl.viewport(0, 0, w, h)  // TODO move this into WebGlRenderer
    }
  }
}

/** @private */
/*
function setCanvasStyles (canvas) {
  canvas.style.margin = '0'
  canvas.style.padding = '0'
  canvas.style.border = '0'
  canvas.style.touchAction = 'none'
  setUserSelectStyle(canvas)
}
*/

/** @private */
/*
function setUserSelectStyle (element, value = 'none') {
  if ('userSelect' in element.style) {
    element.style.userSelect = value
  } else {
    if ('webkitUserSelect' in element.style) element.style.webkitUserSelect = value
    if ('mozUserSelect' in element.style) element.style.mozUserSelect = value
    if ('msUserSelect' in element.style) element.style.msUserSelect = value
  }
}
*/

/** @private */
function createGlContext (canvas, ctxAttrs) {
  let gl

  try {
    gl = canvas.getContext('webgl', ctxAttrs)
  } catch (err0) {
    console.error(err0)
  }

  if (!gl) {
    try {
      gl = canvas.getContext('experimental-webgl', ctxAttrs)
    } catch (err1) {
      console.error(err1)
    }
  }

  if (!gl) {
    throw new Error('cannot create webgl1 context')
  }

  return gl
}
