import { isNonEmptyString, isValidObject } from 'picimo/utils'
import { debug } from 'common/log'

const urlRegexp = new RegExp(/^url\((.*)\)$/)
const httpRegexp = new RegExp(/^https?:\/\//)
const imageExtRegexp = new RegExp(/\.(png|gif|jpg|webp)/)

const makeReadTexture = (el, component) => () => {
  const { frame } = component
  el.entity.emit('getTexture', { frame }, texture => {
    component.texture = texture
    component.entity.emit('texture', texture)
  })
}

const loadTexture = (component, el) => {
  const { textureId } = el
  if (textureId) {
    component.textureId = textureId
    component.entity.emit('textureId', textureId)

    const readTexture = makeReadTexture(el, component)

    if (el.loadResource) {
      el.loadResource().then(readTexture)
    } else {
      readTexture()
    }
    // TODO TextureComponent: support more texture sources
    // - <img>
    // - <canvas>
    // - <pi-render-to-texture>
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
      const el = document.querySelector(src)
      if (el) {
        loadTexture(component, el)
      }
    }
  }
}

const parseConfig = (component, config) => {
  if (isNonEmptyString(config)) {
    parseTextureSource(component, config)
  } else if (isValidObject(config)) {
    component.frame = config.frame
    parseTextureSource(component, config.src)
  }
}

export default class TextureComponent {
  constructor (entity, config) {
    this.entity = entity

    entity.retain(['textureId', 'texture'])

    parseConfig(this, config)
  }

  update (config) {
    parseConfig(this, config)
  }
}
