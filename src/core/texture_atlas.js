import Texture from './texture'
import PowerOf2Image from './power_of_2_image'

export default class TextureAtlas {
  constructor (jsonDef) {
    this.jsonDef = jsonDef
    this.frameNames = Object.keys(jsonDef.frames)
  }

  get frames () {
    return this.jsonDef.frames
  }

  get meta () {
    return this.jsonDef.meta
  }

  get imageUrl () {
    return this.meta.image
  }

  createTextures (image = null) {
    return (
      Promise.resolve(image)
      .then(img => {
        if (typeof image === 'function') {
          return Promise.resolve(image(this))
        } else if (typeof image === 'string') {
          return (new PowerOf2Image(image)).complete
        } else if (image) {
          return image
        } else {
          throw new Error('TextureAtlas.createTextures(): no image found!')
        }
      })
      .then(img => {
        const rootTexture = new Texture(img)
        const frames = new Map()
        for (let name of Object.keys(this.frames)) {
          const { frame } = this.frames[name]
          frames.set(name, new Texture(rootTexture, frame.w, frame.h, frame.x, frame.y))
        }
        return frames
      })
    )
  }

  static load (url, options) {
    return window.fetch(url, options).then(response => response.json()).then(json => new TextureAtlas(json))
  }
}
