import textureLibrary from 'picimo/textureLibrary'
import { defineHiddenPropertyRW } from 'picimo/utils'

import ResourceElement from '../ResourceElement'

import {
  ATTR_SRC,
  EVENT_LOAD_RESOURCE,
  EVENT_RESOURCE_LOADED
} from '../constants'

import loadTexture from './loadTexture'

export default class TextureElement extends ResourceElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)

    defineHiddenPropertyRW(self, 'lastSrc')

    /**
     * The `textureHints` are set after loading the texture resource.
     */
    self.textureHints = undefined

    const { entity } = self

    entity.on(EVENT_LOAD_RESOURCE, loadTexture)

    entity.once(EVENT_RESOURCE_LOADED, texture => {
      entity.on('getTexture', (_, put) => put(texture))
    })

    entity.on('selectDeferred:texture', select => select(self.loadResource()))

    return self
  }

  get src () { return this.getAttribute(ATTR_SRC) }
  get textureId () { return this.entity.id }
  get textureLibrary () { return textureLibrary }
}
