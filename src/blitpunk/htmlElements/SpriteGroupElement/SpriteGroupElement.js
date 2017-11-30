import { textureLibrary, resourceLibrary } from 'blitpunk'
import SpriteGroup from 'blitpunk/core/sprite_group'
import {
  createVoPropsSetter,
  isNonEmptyString,
  isNumberGreaterThanZero,
  parseCssStyledProperties
} from 'blitpunk/utils'
import { debug } from 'common/log'

import EntityElement from '../EntityElement'

import {
  ATTR_DESCRIPTOR,
  ATTR_VERTEX_SHADER,
  ATTR_FRAGMENT_SHADER,
  ATTR_PRIMITIVE,
  ATTR_CAPACITY,
  ATTR_TEXTURE_MAP,
  ATTR_VO_NEW,
  ATTR_VO_ZERO
} from '../constants'

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

const createSpriteGroup = el => {
  const config = readConfigFromAttributes(el)
  if (isValidConfig(config)) {
    el.spriteGroup = new SpriteGroup(el.resourceLibrary, el.textureLibrary, config)
    el.resolveSpriteGroupPromise(el.spriteGroup)
    el.resolveSpriteGroupPromise = null
    return el.spriteGroup
  }
}

const syncTextureMap = (el, data) => {
  const { spriteGroup } = el
  const texMap = parseCssStyledProperties(data)
  if (!texMap || typeof texMap !== 'object') return
  el.textureMap = {}
  const textureElements = []
  Object.keys(texMap).forEach((key) => {
    const selector = texMap[key]
    const texEl = document.querySelector(selector)
    if (textureElements.indexOf(texEl) === -1) textureElements.push(texEl)
    el.textureMap[key] = texEl.textureId
    spriteGroup.setTexture(key, texEl.textureId)
  })
  debug('[sprite-group] use textures from', textureElements)
  textureElements.forEach(texEl => texEl.loadTexture())
}

const renderFrame = el => {
  let { spriteGroup } = el
  if (!spriteGroup) {
    spriteGroup = createSpriteGroup(el)
    debug('[sprite-group] spriteGroup created', el.spriteGroup)
  }
  if (spriteGroup) {
    const texMap = el.getAttribute(ATTR_TEXTURE_MAP)
    if (texMap && el.previousTextureMap !== texMap) {
      el.previousTextureMap = texMap
      syncTextureMap(el, texMap)
      debug('[sprite-group] textureMap synced', el.textureMap)
    }
  }
}

const postRenderFrame = (el, renderer) => {
  let spriteGroup = el.spriteGroup
  if (spriteGroup) {
    spriteGroup.renderFrame(renderer)
  }
}

export default class SpriteGroupElement extends EntityElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)

    self.spriteGroup = null
    self.spriteGroupPromise = new Promise(resolve => {
      Object.defineProperty(self, 'resolveSpriteGroupPromise', {
        value: resolve,
        writable: true
      })
    })

    Object.defineProperty(self, 'previousTextureMap', {
      value: null,
      writable: true
    })

    self.entity.on('renderFrame', renderer => renderFrame(this, renderer))
    self.entity.on('postRenderFrame', renderer => postRenderFrame(this, renderer))

    // debug('[sprite-group] constructor, self=', self)

    return self
  }

  get textureLibrary () { return textureLibrary }
  get resourceLibrary () { return resourceLibrary }

  createSpriteGroup () {
    if (!this.spriteGroup) {
      createSpriteGroup(this)
    }
    return this.spriteGroupPromise
  }
}
