import CanvasElement from './elements/CanvasElement'
import EntityElement from './elements/EntityElement'
// import SceneElement from './elements/SceneElement'
// import TextureAtlasElement from './elements/TextureAtlasElement'
// import SpriteGroupElement from './elements/SpriteGroupElement'

import {
  DOM_ELEM_CANVAS,
  DOM_ELEM_ENTITY
  // DOM_ELEM_SCENE,
  // DOM_ELEM_TEXTURE_ATLAS,
  // DOM_ELEM_SPRITE_GROUP
} from './constants'

import './blitpunk.scss'

/**
 * Define all `<blitpunk-*>` custom html elements.
 * Should be called once at startup.
 */
export default function defineCustomElements () {
  // define element in the CustomElementRegistry
  window.customElements.define(DOM_ELEM_CANVAS, CanvasElement)
  window.customElements.define(DOM_ELEM_ENTITY, EntityElement)
  // window.customElements.define(DOM_ELEM_SCENE, SceneElement)
  // window.customElements.define(DOM_ELEM_TEXTURE_ATLAS, TextureAtlasElement)
  // window.customElements.define(DOM_ELEM_SPRITE_GROUP, SpriteGroupElement)
}
