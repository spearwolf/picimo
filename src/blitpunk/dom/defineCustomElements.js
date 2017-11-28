import {
  CanvasElement,
  EntityElement,
  TextureAtlasElement,
  SpriteGroupElement
} from './elements'

import {
  DOM_ELEM_CANVAS,
  DOM_ELEM_ENTITY,
  DOM_ELEM_TEXTURE_ATLAS,
  DOM_ELEM_SPRITE_GROUP
} from './constants'

import './blitpunk.scss'

/**
 * Define all `<blitpunk-*>` custom elements.
 * Should be called only once at startup.
 */
export default function defineCustomElements () {
  [
    [DOM_ELEM_CANVAS, CanvasElement],
    [DOM_ELEM_ENTITY, EntityElement],
    [DOM_ELEM_TEXTURE_ATLAS, TextureAtlasElement],
    [DOM_ELEM_SPRITE_GROUP, SpriteGroupElement]
  ].forEach(
      ([tagName, elementConstructor]) => window.customElements.define(tagName, elementConstructor))
}
