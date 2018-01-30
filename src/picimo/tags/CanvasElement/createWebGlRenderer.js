import WebGlContext from 'picimo/render/web_gl_context'
import WebGlRenderer from 'picimo/render/web_gl_renderer'

import { error } from 'common/log'

import readBooleanAttribute from '../shared/readBooleanAttribute'

import {
  ATTR_ALPHA,
  ATTR_ANTIALIAS,
  ATTR_NO_DEPTH,
  ATTR_NO_PREMULTIPLIED_ALPHA,
  ATTR_PRESERVE_DRAW,
  ATTR_STENCIL
} from '../constants'

const createCanvasContextAttributes = (el) => ({
  alpha: readBooleanAttribute(el, ATTR_ALPHA, false),
  depth: !readBooleanAttribute(el, ATTR_NO_DEPTH, false),
  stencil: readBooleanAttribute(el, ATTR_STENCIL, false),
  antialias: readBooleanAttribute(el, ATTR_ANTIALIAS, false),
  premultipliedAlpha: !readBooleanAttribute(el, ATTR_NO_PREMULTIPLIED_ALPHA, false),
  preserveDrawingBuffer: readBooleanAttribute(el, ATTR_PRESERVE_DRAW, false)
})

const createWebGlContext = (canvas, attributes) => {
  let gl

  try {
    gl = canvas.getContext('webgl', attributes)
  } catch (err0) {
    error(err0)
  }

  if (!gl) {
    try {
      gl = canvas.getContext('experimental-webgl', attributes)
    } catch (err1) {
      error(err1)
    }
  }

  if (!gl) {
    throw new Error(`Could not create WebGL context, attributes=${JSON.stringify(attributes)}`)
  }

  return gl
}

/** @private */
export default (el) => {
  const canvasContextAttributes = Object.freeze(createCanvasContextAttributes(el))
  const glx = new WebGlContext(createWebGlContext(el.canvas, canvasContextAttributes))
  return {
    canvasContextAttributes,
    webGlRenderer: new WebGlRenderer(glx)
  }
}
