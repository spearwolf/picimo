import { textureLibrary, resourceLibrary } from 'blitpunk'
import { createVoPropsSetter, isNonEmptyString, isNumberGreaterThanZero, isString } from 'blitpunk/utils'
import { PRIO_RF_SPRITE_GROUP, PRIO_PRF_SPRITE_GROUP } from 'blitpunk/priorities'
import SpriteGroup from 'blitpunk/core/sprite_group'
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

import syncTextureMap from './syncTextureMap'

const createConfig = config => Object.assign({}, config, {
  capacity: parseInt(config.capacity, 10),
  voNew: (isString(config.voNew) ? createVoPropsSetter(config.voNew) : config.voNew),
  voZero: (isString(config.voZero) ? createVoPropsSetter(config.voZero) : config.voZero)
})

const isValidConfig = config => (
  isNonEmptyString(config.descriptor) &&
  isNonEmptyString(config.vertexShader) &&
  isNonEmptyString(config.fragmentShader) &&
  isNonEmptyString(config.primitive) &&
  isNumberGreaterThanZero(config.capacity)
)

const createSpriteGroup = el => {
  const config = createConfig(el.spriteGroupConfig)
  if (isValidConfig(config)) {
    el._spriteGroupConfig = config
    el.spriteGroup = new SpriteGroup(el.resourceLibrary, el.textureLibrary, config)
    debug(`[sprite-group/${el.entity.id}] created`, el.spriteGroup)
    el.resolveSpriteGroupPromise(el.spriteGroup)
    el.resolveSpriteGroupPromise = null
    el.entity.emit('spriteGroupCreated', el.spriteGroup)
    return el.spriteGroup
  }
}

const renderFrame = el => {
  let { spriteGroup } = el
  if (!spriteGroup) {
    spriteGroup = createSpriteGroup(el)
  }
  if (spriteGroup) {
    const texMap = el.getAttribute(ATTR_TEXTURE_MAP)
    if (texMap && el.previousTextureMap !== texMap) {
      el.previousTextureMap = texMap
      syncTextureMap(el, texMap)
      debug(`[sprite-group/${el.entity.id}] textureMap synced`, el.textureMap)
    }
  }
}

const postRenderFrame = (el, renderer) => {
  const { spriteGroup } = el
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

    Object.defineProperty(self, 'previousTextureMap', { value: null, writable: true })
    Object.defineProperty(self, '_spriteGroupConfig', { value: null, writable: true })

    self.entity.on('renderFrame', PRIO_RF_SPRITE_GROUP, renderer => renderFrame(self, renderer))
    self.entity.on('postRenderFrame', PRIO_PRF_SPRITE_GROUP, renderer => postRenderFrame(self, renderer))

    return self
  }

  get textureLibrary () { return textureLibrary }
  get resourceLibrary () { return resourceLibrary }

  get spriteGroupConfig () {
    if (this._spriteGroupConfig) return this._spriteGroupConfig
    return this.readSpriteGroupConfig()
  }

  readSpriteGroupConfig () {
    return {
      // TODO add support for all options from src/core/SpriteGroup
      descriptor: this.getAttribute(ATTR_DESCRIPTOR),
      vertexShader: this.getAttribute(ATTR_VERTEX_SHADER),
      fragmentShader: this.getAttribute(ATTR_FRAGMENT_SHADER),
      primitive: this.getAttribute(ATTR_PRIMITIVE),
      capacity: this.getAttribute(ATTR_CAPACITY),
      voNew: this.getAttribute(ATTR_VO_NEW),
      voZero: this.getAttribute(ATTR_VO_ZERO)
    }
  }

  createSpriteGroup () {
    if (!this.spriteGroup) {
      createSpriteGroup(this)
    }
    return this.spriteGroupPromise
  }
}
