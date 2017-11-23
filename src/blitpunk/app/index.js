import ComponentRegistry from '../ecs/component_registry'
import EntityManager from '../ecs/entity_manager'
import ResourceLibrary from '../core/resource_library'
import TextureLibrary from '../core/texture_library'
import WebGlContext from '../render/web_gl_context'
import WebGlRenderer from '../render/web_gl_renderer'

import registerDefaultComponents from '../dom/registerDefaultComponents'
import destroy from '../utils/destroy'
import { error } from '../../common/log'

const eventize = require('@spearwolf/eventize')
const tinycolor = require('tinycolor2')

const now = () => window.performance.now() / 1000

const defaultOption = (options, key, defaultValueFn) => {
  if (options && key in options) {
    return options[key]
  }
  return typeof defaultValueFn === 'function' ? defaultValueFn() : defaultValueFn
}

class App {
  constructor (options) {
    eventize(this)

    const getOption = defaultOption.bind(null, options)

    this.componentRegistry = getOption('componentRegistry', () => new ComponentRegistry())
    this.entityManager = getOption('entityManager', () => new EntityManager())
    this.resourceLibrary = getOption('resourceLibrary', () => new ResourceLibrary())
    this.textureLibrary = getOption('textureLibrary', () => new TextureLibrary())

    /**
     * @type {CanvasHTMLElement}
     */
    this.canvas = getOption('canvas', () => document.createElement('canvas'))

    /**
     * The initial attributes used to create the webgl context
     * @type {Object}
     * @see https://developer.mozilla.org/de/docs/Web/API/HTMLCanvasElement/getContext
     */
    this.contextAttributes = {
      alpha: getOption('alpha', false),
      depth: getOption('depth', false),
      stencil: getOption('stencil', false),
      antialias: getOption('antialias', false),
      premultipliedAlpha: getOption('premultipliedAlpha', false),
      preserveDrawingBuffer: getOption('preserveDrawingBuffer', false)
    }

    /**
     * Seconds since App startup
     * @type {number}
     */
    this.time = getOption('time', 0)

    /** @private */
    this.lastFrameTime = 0

    /**
     * Seconds since last frame
     * @type {number}
     */
    this.timeFrameOffset = 0

    /**
     * Frame counter since application startup
     * @type {number}
     */
    this.frameNo = getOption('frameNo', 0)

    this.clearColor = getOption('clearColor')

    this.createGlContext = getOption('createGlContext', () => () => createGlContext(this.canvas, this.contextAttributes))

    // TODO add global componentRegistry ?
    registerDefaultComponents(this.componentRegistry)

    this.entity = this.entityManager.createEntity()
    this.entity.setComponent('blitpunk', this)  // why?
    this.entity.setComponent('resourceLibrary', this.resourceLibrary)  // why?
    this.entity.setComponent('textureLibrary', this.textureLibrary) // why?
    this.componentRegistry.createComponent(this.entity, 'children') // why?

    this.el = null

    this.started = false
    this.stopped = false
    this.destroyed = false
  }

  get clearColor () {
    return this.renderer ? this.renderer.clearColor : this._clearColor
  }

  set clearColor (color) {
    this._clearColor = color == null ? color : tinycolor(color)
    if (this.renderer) {
      this.renderer.setClearColor(this._clearColor)
    }
  }

  get canStart () {
    return (!this.started || (this.started && this.stopped)) && !this.destroyed
  }

  start (el = this) {
    if (!this.canStart) return

    if (this.stopped) {
      this.stopped = false
      this.resize()
      this.requestAnimate()
      return
    }

    // first-time initialization follows now ..

    this.el = el
    this.started = true

    /**
     * @type {WebGlContext}
     */
    this.glx = new WebGlContext(this.createGlContext())

    /**
     * @type {WebGlRenderer}
     */
    this.renderer = new WebGlRenderer(this.glx)

    if (this._clearColor) {
      this.renderer.setClearColor(this._clearColor)
    }

    /**
     * Startup time in seconds.
     * @type {number}
     */
    this.startTime = now()

    this.el.appendChild(this.canvas)
    this.resize()
    this.requestAnimate()
  }

  requestAnimate () {
    this.rafSubscription = window.requestAnimationFrame(() => this.animate())
  }

  cancelAnimate () {
    window.cancelAnimationFrame(this.rafSubscription)
  }

  get canStop () {
    return this.started && !this.stopped && !this.destroyed
  }

  stop () {
    if (!this.canStop) return
    this.stopped = true
    this.cancelAnimate()
  }

  destroy () {
    if (this.destroyed) return
    this.cancelAnimate()
    try {
      this.glx.destroy()
    } catch (err0) {
      error('blitpunk->destroy(WebGlContext) panic!', err0)
    }
    try {
      this.renderer.destroy()
    } catch (err1) {
      error('blitpunk->destroy(WebGlRenderer) panic!', err1)
    }
    try {
      this.textureLibrary.destroy()
    } catch (err2) {
      error('blitpunk->destroy(TextureLibrary) panic!', err2)
    }
    try {
      this.resourceLibrary.destroy()
    } catch (err3) {
      error('blitpunk->destroy(ResourceLibrary) panic!', err3)
    }
    try {
      this.entityManager.destroy()
    } catch (err4) {
      error('blitpunk->destroy(EntityManager) panic!', err4)
    }
    // this.componentRegistry (ComponentRegistry)
    this.el.removeChild(this.canvas)
    destroy(this)
  }

  get canAnimate () {
    return this.started && !this.stopped && !this.destroyed
  }

  /**
   * Start the main animation loop.
   */
  animate () {
    if (!this.canAnimate) return
    this.renderFrame()
    this.requestAnimate()
  }

  /**
   * Render the frame.
   */
  renderFrame () {
    ++this.frameNo
    this.time = now() - this.startTime
    if (this.lastFrameTime) {
      this.timeFrameOffset = this.time - this.lastFrameTime
    }
    this.lastFrameTime = this.time
    this.resize()
    this.renderer.renderFrame(this.entity, this)
  }

  /**
   * Resize the canvas dom element to the same size as the `<blitpunk-canvas>.parentNode`
   */
  resize () {
    const style = window.getComputedStyle(this.el, null)
    const el = style.display === 'inline' ? this.el.parentNode : this.el

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
function createGlContext (canvas, ctxAttrs) {
  let gl

  try {
    gl = canvas.getContext('webgl', ctxAttrs)
  } catch (err0) {
    error(err0)
  }

  if (!gl) {
    try {
      gl = canvas.getContext('experimental-webgl', ctxAttrs)
    } catch (err1) {
      error(err1)
    }
  }

  if (!gl) {
    throw new Error('cannot create webgl1 context')
  }

  return gl
}

export default App
