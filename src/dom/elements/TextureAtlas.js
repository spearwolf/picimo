/* global HTMLElement */
import eventize from '@spearwolf/eventize'

import findBlitpunkCanvasElement from '../lib/findBlitpunkCanvasElement.js'
import findParentElementByProperty from '../lib/findParentElementByProperty.js'

import { BLITPUNK_TEXTURE_ATLAS_NODE_NAME } from '../constants'

export default class TextureAtlas extends HTMLElement {
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

  /** @type {Canvas} */
  get blitpunk () { return this.blitpunkCanvas.blitpunk }

  /** @type {Entity} */
  get parentScene () { return this.parentSceneElement.scene }

  /** @type {TextureLibrary} */
  get textureLibrary () { return this.parentSceneElement.textureLibrary }

  /** @type {string} */
  get textureId () { return this.entity.id }

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
    console.log(`<blitpunk-texture-atlas id='${this.getAttribute('id')}' />`, this.textureAtlas)
  }

  /** @private */
  connectedCallback () {
    this.blitpunkCanvas = findBlitpunkCanvasElement(this)
    this.entity = this.blitpunk.entityManager.createEntity()
    this.parentSceneElement = findParentElementByProperty(this, 'scene')
    this.parentScene.children.appendChild(this.entity)
    this.entity.on(this)
    this.loadTextureAtlas(this.getAttribute('src'))
  }

  /** @private */
  attributeChangedCallback (attr, oldValue, newValue) {
    if (attr === 'src') {
      this.loadTextureAtlas(newValue)
    }
  }

  /** @private */
  disconnectedCallback () {
    this.parentScene.children.removeChild(this.entity)
    this.blitpunk.entityManager.destroyEntity(this.entity)
    this.entity.off(this)
    this.entity = null
    this.parentSceneElement = null
    this.blitpunkCanvas = null
    this.textureAtlas = null
  }
}
