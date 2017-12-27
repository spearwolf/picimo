import Texture from './texture'
import TextureAtlasSpec from './texture_atlas_spec.js'
import sample from '../utils/sample.js'

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
   * @param {string} alias - new frame name
   * @param {string} frame - original frame name
   */
  addFrameAlias (alias, frame) {
    if (this.frames.has(frame)) {
      this.frames.set(alias, this.frames.get(frame))
    }
  }

  /**
   * @param {string} name
   * @returns {Texture}
   */
  getFrame (name) {
    return this.frames.get(name)
  }

  /**
   * @returns {Texture}
   */
  getRandomFrame () {
    return sample(Array.from(this.frames.values()))
  }

  /**
   * @returns {string}
   */
  getRandomFrameName () {
    return sample(this.frameNames())
  }

  /**
   * @param {string} [match] - optionally regular expression to filter frame names
   * @returns {Array<string>}
   */
  frameNames (match) {
    const frames = Array.from(this.frames.keys())
    if (match) {
      const regex = new RegExp(match)
      return frames.filter(name => regex.test(name))
    }
    return frames
  }

  /**
   * Loads a TextureAtlas.
   * @param {string} url - should point to the *texture atlas json spec*
   * @param {object} [fetchOptions=undefined] - options for the `fetch()` call
   * @param {string|function|PowerOf2Image|HTMLImageElement|HTMLCanvasElement} [image=null] - per default the image will be loaded from `meta.image` url from the *texture atlas spec*
   * @param {object} [textureHints=undefined] - texture hints
   * @returns {Promise<TextureAtlas>}
   */
  static load (url, fetchOptions = null, image = null, textureHints = undefined) {
    return TextureAtlasSpec.load(url, fetchOptions || {}).then(atlasSpec => atlasSpec.createTextureAtlas(image || atlasSpec.imageUrl, textureHints))
  }
}
