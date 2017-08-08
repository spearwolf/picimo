import readBooleanAttribute from './readBooleanAttribute.js'

export default function readTextureHints (el) {
  return {
    flipY: readBooleanAttribute(el, 'flip-y', false),
    repeatable: readBooleanAttribute(el, 'repeatable', false),
    premultiplyAlpha: readBooleanAttribute(el, 'premultiply-alpha', true),
    nearest: readBooleanAttribute(el, 'nearest', false)
  }
}
