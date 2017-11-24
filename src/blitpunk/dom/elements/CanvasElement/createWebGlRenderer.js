import WebGlContext from 'blitpunk/render/web_gl_context'
import WebGlRenderer from 'blitpunk/render/web_gl_renderer'

import { error } from 'common/log'

import readBooleanAttribute from '../../lib/readBooleanAttribute.js'

import {
  ATTR_ALPHA,
  ATTR_ANTIALIAS,
  ATTR_DEPTH,
  ATTR_PREMULTIPLIED_ALPHA,
  ATTR_PRESERVE_DRAW,
  ATTR_STENCIL
} from '../../constants'

const createCanvasContextAttributes = (el) => ({
  alpha: readBooleanAttribute(el, ATTR_ALPHA, false),
  antialias: readBooleanAttribute(el, ATTR_ANTIALIAS, false),
  depth: readBooleanAttribute(el, ATTR_DEPTH, true),  // ie 11 has no support for false
  premultipliedAlpha: readBooleanAttribute(el, ATTR_PREMULTIPLIED_ALPHA, false),
  preserveDrawingBuffer: readBooleanAttribute(el, ATTR_PRESERVE_DRAW, false),
  stencil: readBooleanAttribute(el, ATTR_STENCIL, false)
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

export default (el) => {
  const canvasContextAttributes = Object.freeze(createCanvasContextAttributes(el))
  const glx = new WebGlContext(createWebGlContext(el.canvas, canvasContextAttributes))
  return {
    canvasContextAttributes,
    webGlRenderer: new WebGlRenderer(glx)
  }
}
