import CanvasElement from './CanvasElement'
import EntityElement from './EntityElement'
import TextureAtlasElement from './TextureAtlasElement'
import SpriteGroupElement from './SpriteGroupElement'
import PictureElement from './PictureElement'

import {
  HTML_ELEMENT_CANVAS,
  HTML_ELEMENT_ENTITY,
  HTML_ELEMENT_PICTURE,
  HTML_ELEMENT_SPRITE_GROUP,
  HTML_ELEMENT_TEXTURE_ATLAS
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
    [HTML_ELEMENT_SPRITE_GROUP, SpriteGroupElement],
    [HTML_ELEMENT_PICTURE, PictureElement]
  ].forEach(
      ([tagName, elementConstructor]) => window.customElements.define(tagName, elementConstructor))
}
