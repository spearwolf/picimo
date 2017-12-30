import textureLibrary from 'picimo/textureLibrary'
import { defineHiddenPropertyRW } from 'picimo/utils'
import { debug } from 'common/log'

import EntityElement from '../EntityElement'
import { ATTR_SRC } from '../constants'

import loadTextureAtlas from './loadTextureAtlas'

export default class TextureAtlasElement extends EntityElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)

    defineHiddenPropertyRW(self, 'previousSrc')

    /**
     * Die textureHints werden nach dem Laden des TextureAtlas
     * gesetzt.
     */
    self.textureHints = undefined

    /**
     * Der Promise wird resolved wenn der TextureAtlas
     * erfolgreich geladen wurde.
     *
     * Die Resolve-Value ist der TextureAtlas.
     *
     * Das Laden des TextureAtlas wird allerdings nur mit
     * `loadTextureAtlas()` getriggered.
     */
    self.textureAtlasPromise = new Promise(resolve => {
      defineHiddenPropertyRW(self, 'resolveTextureAtlasPromise', resolve)
    })

    // debug('[texture-atlas] constructor, self=', self)

    return self
  }

  get textureId () { return this.entity.id }
  get textureLibrary () { return textureLibrary }

  /**
   * Lade die TextureAtlas Resourcen (json + image).
   * Die url der TextureAtlas Resource wird per `src` attribute gesetzt.
   *
   * Wenn das `src` Attribute leer ist, wird nichts geladen.
   *
   * Return value ist der Promise von `textureAtlasPromise`
   *
   * Die Promise-Resolve-Value ist der TextureAtlas.
   */
  loadTextureAtlas () {
    const src = this.getAttribute(ATTR_SRC)
    if (src) {
      debug('[texture-atlas] loadTextureAtlas, src=', src)
      loadTextureAtlas(this, src)
    }
    return this.textureAtlasPromise
  }

  /**
   * Lade die Texture.
   * Wird zB. von <pi-sprite-group> aufgerufen.
   */
  loadTexture () {
    if (!this.textureAtlas) {
      this.loadTextureAtlas()
    }
    return this.textureAtlasPromise
  }
}
