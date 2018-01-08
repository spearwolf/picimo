import textureLibrary from 'picimo/textureLibrary'
import { defineHiddenPropertyRW } from 'picimo/utils'

import EntityElement from '../EntityElement'
import { ATTR_SRC } from '../constants'

import loadTexture from './loadTexture'

export default class TextureElement extends EntityElement {
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
     * Der Promise wird resolved wenn die Texture erfolgreich geladen wurde.
     *
     * Die Resolve-Value ist die Texture.
     *
     * Das Laden der Texture wird mit `loadTexture()` getriggered.
     */
    self.texturePromise = new Promise(resolve => {
      defineHiddenPropertyRW(self, 'resolveTexturePromise', resolve)
    })

    return self
  }

  get textureId () { return this.entity.id }
  get textureLibrary () { return textureLibrary }

  /**
   * Lade eine Texture Resource.
   *
   * Wird zB. von <pi-sprite-group> aufgerufen.
   *
   * Die url der Texture Resource wird per `src` attribute gesetzt.
   *
   * Wenn das `src` Attribute leer ist, wird nichts geladen.
   *
   * Return value ist der Promise `texturePromise`
   *
   * Die Promise-Resolve-Value ist die Texture.
   */
  loadTexture () {
    if (!this.texture) {
      const src = this.getAttribute(ATTR_SRC)
      if (src) {
        // debug('[texture] loadTexture, src=', src)
        loadTexture(this, src)
      }
    }
    return this.texturePromise
  }
}
