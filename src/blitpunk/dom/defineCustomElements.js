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
 * Define all `<blitpunk-*>` custom elements.
 * Should be called only once at startup.
 */
export default function defineCustomElements () {
  const { customElements } = window
  customElements.define(DOM_ELEM_CANVAS, CanvasElement)
  customElements.define(DOM_ELEM_ENTITY, EntityElement)
  // customElements.define(DOM_ELEM_SCENE, SceneElement)
  // customElements.define(DOM_ELEM_TEXTURE_ATLAS, TextureAtlasElement)
  // customElements.define(DOM_ELEM_SPRITE_GROUP, SpriteGroupElement)
}
