import EntityElement from '../EntityElement'
import textureLibrary from 'blitpunk/textureLibrary'
import { debug } from 'common/log'

import loadTextureAtlas from './loadTextureAtlas'
import { ATTR_SRC } from '../../constants'

export default class TextureAtlasElement extends EntityElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)

    debug('[texture-atlas] constructor, self=', self)

    Object.defineProperties(self, {
      previousSrc: { value: undefined, writable: true }
    })

    /**
     * Die textureHints werden nach dem Laden des TextureAtlas
     * gesetzt.
     */
    self.textureHints = undefined

    /**
     * Der Promise wird resolved wenn der TextureAtlas
     * erfolgreich geladen wurde.
     * Die Resolve-Value ist der TextureAtlas.
     *
     * Das Laden des TextureAtlas wird allerdings nur mit
     * `loadTextureAtlas()` getriggered.
     */
    self.textureAtlasPromise = new Promise(resolve => {
      Object.defineProperty(self, 'resolveTextureAtlasPromise', {
        value: resolve,
        writable: true
      })
    })

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
      loadTextureAtlas(this, src)
    }
    return this.textureAtlasPromise
  }
}
