import { isNonEmptyString, isValidObject } from 'picimo/utils'
import { debug } from 'common/log'

const urlRegexp = new RegExp(/^url\((.*)\)$/)
const httpRegexp = new RegExp(/^https?:\/\//)
const imageExtRegexp = new RegExp(/\.(png|gif|jpg|webp)/)

const queryTextureId = (component, selector) => {
  const el = document.querySelector(selector)
  if (el) {
    const { textureId } = el
    if (textureId) {
      component.textureId = textureId
      component.entity.emit('textureId', textureId)
      if (el.textureAtlasPromise) {
        el.textureAtlasPromise.then(atlas => {
          if (component.frame) {
            component.texture = atlas.getFrame(component.frame)
          } else {
            component.texture = atlas.rootTexture
          }
        })
      }
      // TODO detect
      // - <pi-texture />
      // - <img>
      // - <canvas>
    }
  }
}

const parseTextureSource = (component, src) => {
  if (src.match(httpRegexp) || src.match(imageExtRegexp)) {
    // TODO load texture/image from url
    debug('[texture] TODO load texture/image from url=', src)
  } else {
    const m = src.match(urlRegexp)
    if (m) {
      // TODO load texture/image from url
      debug('[texture] TODO load texture/image from url=', src)
    } else {
      queryTextureId(component, src)
    }
  }
}

const parseConfig = (component, config) => {
  if (isNonEmptyString(config)) {
    parseTextureSource(component, config)
  } else if (isValidObject(config)) {
    parseTextureSource(component, config.src)
    if (config.frame) {
      component.frame = config.frame
    }
  }
}

export default class TextureComponent {
  constructor (entity, config) {
    this.entity = entity
    parseConfig(this, config)
    debug('[texture] create', this)
  }

  update (config) {
    parseConfig(this, config)
    debug('[texture] update', this)
  }
}
