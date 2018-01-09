import textureLibrary from 'picimo/textureLibrary'
import { defineHiddenPropertyRW } from 'picimo/utils'

import ResourceElement from '../ResourceElement'

import {
  ATTR_SRC,
  EVENT_LOAD_RESOURCE,
  EVENT_RESOURCE_LOADED
} from '../constants'

import loadTextureAtlas from './loadTextureAtlas'

export default class TextureAtlasElement extends ResourceElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)

    defineHiddenPropertyRW(self, 'lastSrc')

    /**
     * The `textureHints` are set after loading the texture resource.
     */
    self.textureHints = undefined

    const { entity } = self

    entity.on(EVENT_LOAD_RESOURCE, loadTextureAtlas)

    entity.once(EVENT_RESOURCE_LOADED, atlas => {
      entity.on('getTexture', (opts, put) => {
        const frame = opts && opts.frame
        if (frame) {
          put(atlas.getFrame(frame))
        } else {
          put(atlas.rootTexture)
        }
      })
    })

    return self
  }

  get src () { return this.getAttribute(ATTR_SRC) }
  get textureId () { return this.entity.id }
  get textureLibrary () { return textureLibrary }
}
