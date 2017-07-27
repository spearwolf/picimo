/* global HTMLElement */
import eventize from '@spearwolf/eventize'

import App from '../app'

import { BLITP_CANVAS_NODE_NAME } from './constants'

/**
 * The **custom HTML `<blitpunk-canvas></blitpunk-canvas>` element** represents the *webgl* canvas,
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
 *   <blitpunk-canvas alpha antialias>
 *     ...
 *   </blitpunk-canvas>
 *   ...
 */
export default class BlitpCanvas extends HTMLElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)
    this.blitpunk = new App()
    return eventize(self)
  }

  get blitpunkNodeName () { return BLITP_CANVAS_NODE_NAME }

  get canvas () { return this.blitpunk.canvas }
  get width () { return this.blitpunk.width }
  get height () { return this.blitpunk.height }

  get glx () { return this.blitpunk.glx }
  get renderer () { return this.blitpunk.renderer }
  get time () { return this.blitpunk.time }
  get startTime () { return this.blitpunk.startTime }
  get frameNo () { return this.blitpunk.frameNo }

  get componentRegistry () { return this.blitpunk.componentRegistry }
  get entityManager () { return this.blitpunk.entityManager }
  get resourceLibrary () { return this.blitpunk.resourceLibrary }
  get textureLibrary () { return this.blitpunk.textureLibrary }

  renderFrame () { this.blitpunk.renderFrame() }

  static get observedAttributes () {
    return ['clear-color']
  }

  onKeydown (event) {
    if (event.ctrlKey && event.key === 'd') {
      console.group('<blitpunk/>', 'frame', this.frameNo)
      console.log(this)
      console.log(this.blitpunk)
      this.emit('debug', this)
      this.renderer.emit('debug', this.renderer)
      console.groupEnd()
    }
  }

  set clearColor (color) {
    this.blitpunk.clearColor = color
  }

  get clearColor () {
    const col = this.blitpunk.clearColor
    if (col) {
      return col.getAlpha() === 1 ? col.toHexString() : col.toRgbString()
    }
  }

  /** @private */
  connectedCallback () {
    this.blitpunk.contextAttributes = Object.freeze({
      alpha: this.hasAttribute('alpha'),
      depth: this.hasAttribute('depth'),
      stencil: this.hasAttribute('stencil'),
      antialias: this.hasAttribute('antialias'),
      premultipliedAlpha: this.hasAttribute('premultipliedAlpha'),
      preserveDrawingBuffer: this.hasAttribute('preserveDrawingBuffer')
    })

    this.onKeydown = this.onKeydown.bind(this)
    document.body.addEventListener('keydown', this.onKeydown)

    this.blitpunk.start(this)
  }

  /** @private */
  disconnectedCallback () {
    this.blitpunk.destroy()

    document.body.removeEventListener('keydown', this.onKeydown)
  }

  attributeChangedCallback (attr, oldValue, newValue) {
    if (attr === 'clear-color') {
      this.clearColor = newValue
    }
  }
}
