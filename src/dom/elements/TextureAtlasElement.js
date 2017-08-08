/* global HTMLElement */
import eventize from '@spearwolf/eventize'

import connectElementEntities from '../lib/connectElementEntities.js'
import disconnectElementEntities from '../lib/disconnectElementEntities.js'
import readBooleanAttribute from '../lib/readBooleanAttribute.js'

import { NODE_NAME_TEXTURE_ATLAS } from '../constants'

const createTextureHints = (el) => ({
  flipY: readBooleanAttribute(el, 'flip-y', false),
  repeatable: readBooleanAttribute(el, 'repeatable', false),
  premultiplyAlpha: readBooleanAttribute(el, 'premultiply-alpha', true),
  pixelate: readBooleanAttribute(el, 'pixelate', false)
})

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
  get blitpunkNodeName () { return NODE_NAME_TEXTURE_ATLAS }

  /** @type {string} */
  get textureId () { return this.entity && this.entity.id }

  loadTextureAtlas (src) {
    if (src && this.entity) {
      if (this.prevUrl !== src) {
        this.prevUrl = src
        this.textureHints = createTextureHints(this)
        this.textureAtlasPromise = this.textureLibrary
          .loadTextureAtlas(this.textureId, src, this.textureHints)
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
