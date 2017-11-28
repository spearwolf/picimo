import CanvasElement from './CanvasElement'
import EntityElement from './EntityElement'
import TextureAtlasElement from './TextureAtlasElement'
import SpriteGroupElement from './SpriteGroupElement'

import {
  HTML_ELEMENT_CANVAS,
  HTML_ELEMENT_ENTITY,
  HTML_ELEMENT_TEXTURE_ATLAS,
  HTML_ELEMENT_SPRITE_GROUP
} from './constants'

import './index.scss'

/**
 * Define all `<blitpunk-*>` custom elements.
 * Should be called only once at startup.
 */
export default function defineCustomElements () {
  [
    [HTML_ELEMENT_CANVAS, CanvasElement],
    [HTML_ELEMENT_ENTITY, EntityElement],
    [HTML_ELEMENT_TEXTURE_ATLAS, TextureAtlasElement],
    [HTML_ELEMENT_SPRITE_GROUP, SpriteGroupElement]
  ].forEach(
      ([tagName, elementConstructor]) => window.customElements.define(tagName, elementConstructor))
}
