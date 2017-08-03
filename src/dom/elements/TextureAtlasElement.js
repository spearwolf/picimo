/* global HTMLElement */
import eventize from '@spearwolf/eventize'

import connectElementEntities from '../lib/connectElementEntities.js'
import disconnectElementEntities from '../lib/disconnectElementEntities.js'

import { BLITPUNK_TEXTURE_ATLAS_NODE_NAME } from '../constants'

export default class TextureAtlasElement extends HTMLElement {
  /** @private */
  static get observedAttributes () {
    return [
      'src'
    ]
  }

  /** @ignore */
  constructor (_) {
    const self = super(_)
    return eventize(self)
  }

  /** @type {string} */
  get blitpunkNodeName () { return BLITPUNK_TEXTURE_ATLAS_NODE_NAME }

  /** @type {string} */
  get textureId () { return this.entity && this.entity.id }

  loadTextureAtlas (src) {
    if (src && this.entity) {
      if (this.prevUrl !== src) {
        this.prevUrl = src
        this.textureAtlasPromise = this.textureLibrary
          .loadTextureAtlas(this.textureId, src)
          .then((atlas) => {
            this.textureAtlas = atlas
            return atlas
          })
        return this.textureAtlasPromise
      }
    }
  }

  /** @private */
  debug () {
    console.log(this.textureAtlas)
  }

  /** @private */
  connectedCallback () {
    connectElementEntities(this)
    this.textureLibrary = this.parentSceneElement.textureLibrary  // TODO for every element?
    this.loadTextureAtlas(this.getAttribute('src'))
  }

  /** @private */
  disconnectedCallback () {
    // TODO disconnectedCallback <blitpunk-texture-atlas/>
    this.textureAtlas = null
    this.textureLibrary = null
    disconnectElementEntities(this)
  }

  /** @private */
  attributeChangedCallback (attr, oldValue, newValue) {
    if (attr === 'src') {
      this.loadTextureAtlas(newValue)
    }
  }
}