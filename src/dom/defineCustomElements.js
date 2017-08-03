import CanvasElement from './elements/CanvasElement.js'
import SceneElement from './elements/SceneElement.js'
import TextureAtlasElement from './elements/TextureAtlasElement.js'
import SpriteGroupElement from './elements/SpriteGroupElement.js'

import {
  BLITPUNK_CANVAS_ELEMENT,
  BLITPUNK_SCENE_ELEMENT,
  BLITPUNK_TEXTURE_ATLAS_ELEMENT,
  BLITPUNK_SPRITE_GROUP_ELEMENT } from './constants'

// https://github.com/WebReflection/document-register-element
import installCE from 'document-register-element/pony'

import './blitpunk.scss'

/**
 * Define all `<blitpunk-*>` custom html elements.
 * Should be called once at startup.
 */
export default function defineCustomElements () {
  // install custom elements polyfill
  installCE(window)

  // define element in the CustomElementRegistry
  window.customElements.define(BLITPUNK_CANVAS_ELEMENT, CanvasElement)
  window.customElements.define(BLITPUNK_SCENE_ELEMENT, SceneElement)
  window.customElements.define(BLITPUNK_TEXTURE_ATLAS_ELEMENT, TextureAtlasElement)
  window.customElements.define(BLITPUNK_SPRITE_GROUP_ELEMENT, SpriteGroupElement)
}
