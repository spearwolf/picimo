/* global HTMLElement */
import App from '../../app.js'

import readBooleanAttribute from '../lib/readBooleanAttribute.js'

import {
  NODE_NAME_CANVAS,
  ATTR_ALPHA,
  ATTR_ANTIALIAS,
  ATTR_BLEND_MODE,
  ATTR_CLEAR_COLOR,
  ATTR_DEPTH,
  ATTR_PREMULTIPLIED_ALPHA,
  ATTR_PRESERVE_DRAW,
  ATTR_PROJECTION,
  ATTR_STENCIL
} from '../constants'

const eventize = require('@spearwolf/eventize')

const createContextAttributes = (el) => ({
  alpha: readBooleanAttribute(el, ATTR_ALPHA, false),
  depth: readBooleanAttribute(el, ATTR_DEPTH, true),  // ie 11 has no support for false
  stencil: readBooleanAttribute(el, ATTR_STENCIL, false),
  antialias: readBooleanAttribute(el, ATTR_ANTIALIAS, false),
  premultipliedAlpha: readBooleanAttribute(el, ATTR_PREMULTIPLIED_ALPHA, false),
  preserveDrawingBuffer: readBooleanAttribute(el, ATTR_PRESERVE_DRAW, false)
})

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
 * - `premultiplied-alpha`
 * - `preserve-drawing-buffer`
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
export default class CanvasElement extends HTMLElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)
    eventize(self)
    self.blitpunk = new App()
    self.blitpunk.entity.on(self)
    return self
  }

  get blitpunkNodeName () { return NODE_NAME_CANVAS }

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

  get scene () { return this.blitpunk.entity }

  /** @private */
  static get observedAttributes () {
    return [
      ATTR_BLEND_MODE,
      ATTR_CLEAR_COLOR,
      ATTR_PROJECTION
    ]
  }

  /** @private */
  onKeydown (event) {
    if (event.ctrlKey && event.key === 'd') {
      console.group('<blitpunk/>', 'frameNo', this.frameNo)
      console.log(this)
      console.log(this.blitpunk)
      this.blitpunk.entity.emit('debug', this)
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
    this.blitpunk.contextAttributes = Object.freeze(createContextAttributes(this))

    this.onKeydown = this.onKeydown.bind(this)
    document.body.addEventListener('keydown', this.onKeydown)

    this.blitpunk.start(this)
  }

  /** @private */
  disconnectedCallback () {
    this.blitpunk.destroy()

    document.body.removeEventListener('keydown', this.onKeydown)
  }

  /** @private */
  attributeChangedCallback (attr, oldValue, newValue) {
    switch (attr) {
      case ATTR_CLEAR_COLOR:
        this.clearColor = newValue
        break
      case ATTR_BLEND_MODE:
      case ATTR_PROJECTION:
        this.blitpunk.componentRegistry.createOrUpdateComponent(this.blitpunk.entity, attr, newValue)
    }
  }
}
