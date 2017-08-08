import readBooleanAttribute from './readBooleanAttribute.js'

import {
  ATTR_FLIP_Y,
  ATTR_REPEATABLE,
  ATTR_PREMULTIPLY_ALPHA,
  ATTR_NEAREST
} from '../constants'

export default function readTextureHints (el) {
  return {
    flipY: readBooleanAttribute(el, ATTR_FLIP_Y, false),
    repeatable: readBooleanAttribute(el, ATTR_REPEATABLE, false),
    premultiplyAlpha: readBooleanAttribute(el, ATTR_PREMULTIPLY_ALPHA, true),
    nearest: readBooleanAttribute(el, ATTR_NEAREST, false)
  }
}
