import CanvasElement from './elements/CanvasElement.js'
import SceneElement from './elements/SceneElement.js'
import TextureAtlasElement from './elements/TextureAtlasElement.js'
import SpriteGroupElement from './elements/SpriteGroupElement.js'

import {
  DOM_ELEM_CANVAS,
  DOM_ELEM_SCENE,
  DOM_ELEM_TEXTURE_ATLAS,
  DOM_ELEM_SPRITE_GROUP
} from './constants'

import './blitpunk.scss'

/**
 * Define all `<blitpunk-*>` custom html elements.
 * Should be called once at startup.
 */
export default function defineCustomElements () {
  // define element in the CustomElementRegistry
  window.customElements.define(DOM_ELEM_CANVAS, CanvasElement)
  window.customElements.define(DOM_ELEM_SCENE, SceneElement)
  window.customElements.define(DOM_ELEM_TEXTURE_ATLAS, TextureAtlasElement)
  window.customElements.define(DOM_ELEM_SPRITE_GROUP, SpriteGroupElement)
}
