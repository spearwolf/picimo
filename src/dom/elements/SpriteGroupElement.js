/* global HTMLElement */
import eventize from '@spearwolf/eventize'

import SpriteGroup from 'src/core/sprite_group'

import connectElementEntities from '../lib/connectElementEntities.js'
import disconnectElementEntities from '../lib/disconnectElementEntities.js'
import parseComponentData from '../lib/parseComponentData.js'

import { BLITPUNK_SPRITE_GROUP_NODE_NAME } from '../constants'

const isNonEmptyString = (str) => typeof str === 'string' && str.length > 0
const isPositiveNumber = (num) => typeof num === 'number' && num > 0

const createConfig = ({ descriptor, capacity, vertexShader, fragmentShader, primitive }) => ({
  descriptor,
  vertexShader,
  fragmentShader,
  primitive,
  capacity: parseInt(capacity, 10),
  voNew: (vo) => {  // TODO
    vo.scale = 1
    vo.opacity = 1
  }
})

const readConfigFromAttributes = (el) => createConfig({
  descriptor: el.getAttribute('descriptor'),
  vertexShader: el.getAttribute('vertex-shader'),
  fragmentShader: el.getAttribute('fragment-shader'),
  primitive: el.getAttribute('primitive'),
  capacity: el.getAttribute('capacity')
})

const isValidConfig = (config) => (
  isNonEmptyString(config.descriptor) &&
  isNonEmptyString(config.vertexShader) &&
  isNonEmptyString(config.fragmentShader) &&
  isNonEmptyString(config.primitive) &&
  isPositiveNumber(config.capacity)
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
  const texMap = parseComponentData(data)
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
      'texture-map',
      'capacity',
      'descriptor',
      'fragment-shader',
      'primitive',
      'vertex-shader'
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
  get blitpunkNodeName () { return BLITPUNK_SPRITE_GROUP_NODE_NAME }

  /** @private */
  renderFrame (renderer) {
    if (this.spriteGroup) {
      this.spriteGroup.renderFrame(renderer)
    }
  }

  /** @private */
  debug () {
    console.log(this.spriteGroup)
    if (this.textureMap) console.log('texture-map', this.textureMap)
  }

  /** @private */
  connectedCallback () {
    connectElementEntities(this)

    this.textureLibrary = this.parentSceneElement.textureLibrary
    this.resourceLibrary = this.parentSceneElement.resourceLibrary

    createSpriteGroup(this)
    syncTextureMap(this, this.getAttribute('texture-map'))
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
    if (attr === 'texture-map') {
      syncTextureMap(this, this.getAttribute(newValue))
    } else {
      if (!this.spriteGroup) {
        createSpriteGroup(this)
      }
    }
  }
}
