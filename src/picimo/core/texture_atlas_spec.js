import Texture from './texture'
import TextureAtlas from './texture_atlas'
import PowerOf2Image from './power_of_2_image'

export default class TextureAtlasSpec {
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

  createTextureAtlas (image = null, textureHints = undefined) {
    return (
      Promise.resolve(image)
      .then(image => {
        if (typeof image === 'function') {
          return Promise.resolve(image(this)).then(img => {
            if (typeof img === 'string') {
              return (new PowerOf2Image(img)).complete
            }
            return img
          })
        } else if (typeof image === 'string') {
          return (new PowerOf2Image(image)).complete
        } else if (image) {
          return image
        } else {
          throw new Error('TextureAtlasSpec.createTextureAtlas(): no image found!')
        }
      })
      .then(image => {
        const rootTexture = new Texture(image, undefined, undefined, 0, 0, textureHints)
        const atlas = new TextureAtlas(rootTexture, this)
        for (let name of Object.keys(this.frames)) {
          const { frame } = this.frames[name]
          atlas.addFrame(name, frame.w, frame.h, frame.x, frame.y)
        }
        return atlas
      })
    )
  }

  static load (url, options) {
    return window.fetch(url, options).then(response => response.json()).then(json => new TextureAtlasSpec(json))
  }
}
