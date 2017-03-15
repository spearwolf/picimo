import Texture from './texture'
import TextureAtlasSpec from './texture_atlas_spec.js'

/**
  * @example
  * TextureAtlas.load('nobinger.json').then(atlas => {
  *   const blau = atlas.getFrame('nobinger-blau.png')
  *   blau.width   # => 55
  *   blau.height  # => 61
  * })
  */
export default class TextureAtlas {
  /**
   * @param {Texture} rootTexture
   * @param {TextureAtlasSpec} [spec=null]
   */
  constructor (rootTexture, spec = null) {
    /**
     * @type {Texture}
     */
    this.rootTexture = rootTexture
    /**
     * @type {TextureAtlasSpec}
     */
    this.spec = spec
    /**
     * @type {Map<string,Texture>}
     */
    this.frames = new Map()
  }

  /**
   * @param {string} name
   * @param {number} width
   * @param {number} height
   * @param {number} x
   * @param {number} y
   */
  addFrame (name, width, height, x, y) {
    this.frames.set(name, new Texture(this.rootTexture, width, height, x, y))
  }

  /**
   * @param {string} name
   * @returns {Texture}
   */
  getFrame (name) {
    return this.frames.get(name)
  }

  /**
   * @returns {Array<string>}
   */
  frameNames () {
    return this.frames.keys()
  }

  /**
   * Loads a TextureAtlas.
   * @param {string} url - should point to the *texture atlas json spec*
   * @param {Object} [fetchOptions=undefined] - options for the `fetch()` call
   * @param {string|function|PowerOf2Image|HTMLImageElement|HTMLCanvasElement} [image=null] - per default the image will be loaded from `meta.image` url from the *texture atlas spec*
   * @returns {Promise<TextureAtlas>}
   */
  static load (url, fetchOptions = null, image = null) {
    return TextureAtlasSpec.load(url, fetchOptions).then(atlasSpec => atlasSpec.createTextureAtlas(image))
  }
}
