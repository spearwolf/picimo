/* global HTMLElement */
import SpriteGroup from 'blitpunk/core/sprite_group'

import parseCssStyledProperties from 'blitpunk/utils/parseCssStyledProperties.js'
import createVoPropsSetter from 'blitpunk/utils/createVoPropsSetter.js'
import isNonEmptyString from 'blitpunk/utils/isNonEmptyString.js'
import isNumberGreaterThanZero from 'blitpunk/utils/isNumberGreaterThanZero.js'

import connectElementEntities from '../lib/connectElementEntities.js'
import disconnectElementEntities from '../lib/disconnectElementEntities.js'
import syncComponent from '../lib/syncComponent.js'

import {
  NODE_NAME_SPRITE_GROUP,
  ATTR_DESCRIPTOR,
  ATTR_VERTEX_SHADER,
  ATTR_FRAGMENT_SHADER,
  ATTR_PRIMITIVE,
  ATTR_CAPACITY,
  ATTR_BLEND_MODE,
  ATTR_TEXTURE_MAP,
  ATTR_VO_NEW,
  ATTR_VO_ZERO
} from '../constants'

const eventize = require('@spearwolf/eventize')

const createConfig = ({ descriptor, capacity, vertexShader, fragmentShader, primitive, voNew, voZero }) => ({
  descriptor,
  vertexShader,
  fragmentShader,
  primitive,
  capacity: parseInt(capacity, 10),
  voNew: createVoPropsSetter(voNew),
  voZero: createVoPropsSetter(voZero)
})

// TODO add support for all options from src/core/SpriteGroup
const readConfigFromAttributes = (el) => createConfig({
  descriptor: el.getAttribute(ATTR_DESCRIPTOR),
  vertexShader: el.getAttribute(ATTR_VERTEX_SHADER),
  fragmentShader: el.getAttribute(ATTR_FRAGMENT_SHADER),
  primitive: el.getAttribute(ATTR_PRIMITIVE),
  capacity: el.getAttribute(ATTR_CAPACITY),
  voNew: el.getAttribute(ATTR_VO_NEW),
  voZero: el.getAttribute(ATTR_VO_ZERO)
})

const isValidConfig = (config) => (
  isNonEmptyString(config.descriptor) &&
  isNonEmptyString(config.vertexShader) &&
  isNonEmptyString(config.fragmentShader) &&
  isNonEmptyString(config.primitive) &&
  isNumberGreaterThanZero(config.capacity)
)

const createSpriteGroup = (el) => {
  if (!el.parentScene) return  // TODO find a better way
  const config = readConfigFromAttributes(el)
  if (isValidConfig(config)) {
    el.spriteGroup = new SpriteGroup(el.resourceLibrary, el.textureLibrary, config)
    el._resolvePromise(el.spriteGroup)
    delete el._resolvePromise
  }
}

const syncTextureMap = (el, data) => {
  const { spriteGroup } = el
  if (!spriteGroup) return
  const texMap = parseCssStyledProperties(data)
  if (!texMap || typeof texMap !== 'object') return
  el.textureMap = {}
  Object.keys(texMap).forEach((key) => {
    const selector = texMap[key]
    const texEl = el.blitpunkCanvas.querySelector(selector)
    el.textureMap[key] = texEl.textureId
    spriteGroup.setTexture(key, texEl.textureId)
  })
}

export default class SpriteGroupElement extends HTMLElement {
  /** @private */
  static get observedAttributes () {
    return [
      ATTR_BLEND_MODE,
      ATTR_CAPACITY,
      ATTR_DESCRIPTOR,
      ATTR_FRAGMENT_SHADER,
      ATTR_PRIMITIVE,
      ATTR_TEXTURE_MAP,
      ATTR_VERTEX_SHADER
    ]
  }

  /** @ignore */
  constructor (_) {
    const self = super(_)
    self.spriteGroupPromise = new Promise((resolve) => {
      self._resolvePromise = resolve
    })
    return eventize(self)
  }

  /** @type {string} */
  get blitpunkNodeName () { return NODE_NAME_SPRITE_GROUP }

  /** @private */
  renderFrame (renderer) {
    if (this.spriteGroup) {
      this.spriteGroup.renderFrame(renderer)
    }
  }

  /** @private */
  debug () {
    console.log(this.spriteGroup)
    if (this.textureMap) console.log(ATTR_TEXTURE_MAP, this.textureMap)
  }

  /** @private */
  connectedCallback () {
    connectElementEntities(this)

    this.textureLibrary = this.parentSceneElement.textureLibrary
    this.resourceLibrary = this.parentSceneElement.resourceLibrary

    createSpriteGroup(this)
    syncTextureMap(this, this.getAttribute(ATTR_TEXTURE_MAP))
    syncComponent(this, ATTR_BLEND_MODE)
  }

  /** @private */
  disconnectedCallback () {
    // TODO disconnectedCallback <blitpunk-sprite-group/>
    this.textureMap = null
    this.spriteGroup = null
    this.textureLibrary = null
    this.resourceLibrary = null
    disconnectElementEntities(this)
  }

  /** @private */
  attributeChangedCallback (attr, oldValue, newValue) {
    switch (attr) {
      case ATTR_TEXTURE_MAP:
        syncTextureMap(this, newValue)
        break
      case ATTR_BLEND_MODE:
        syncComponent(this, attr)
        break
      default:
        if (!this.spriteGroup) {
          createSpriteGroup(this)
        }
    }
  }
}
