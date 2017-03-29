import VODescriptor from './v_o_descriptor'
import ShaderSource from './shader_source'

import addCommonSprites from './sprites'

export default class ResourceLibrary {
  constructor () {
    this.descriptors = new Map()
    this.vertexShaders = new Map()
    this.fragmentShaders = new Map()

    addCommonSprites(this)
  }

  /**
   * @param {string} name
   * @param {Object} description - see `VODescriptor` for more details
   */
  addDescriptor (name, description) {
    this.descriptors.set(name, new VODescriptor(description))
    return this
  }

  /**
   * @param {string} name
   * @param {string|function|string[]} source - see `ShaderSource` for more details
   */
  addVertexShader (name, source) {
    this.vertexShaders.set(name, new ShaderSource(ShaderSource.VERTEX_SHADER, source))
    return this
  }

  /**
   * @param {string} name
   * @param {string|function|string[]} source - see `ShaderSource` for more details
   */
  addFragmentShader (name, source) {
    this.fragmentShaders.set(name, new ShaderSource(ShaderSource.FRAGMENT_SHADER, source))
    return this
  }

  /**
   * @param {string} name
   * @returns {VODescriptor}
   */
  findDescriptor (name) {
    return this.descriptors.get(name)
  }

  /**
   * @param {string} name
   * @returns {ShaderSource}
   */
  findVertexShader (name) {
    return this.vertexShaders.get(name)
  }

  /**
   * @param {string} name
   * @returns {ShaderSource}
   */
  findFragmentShader (name) {
    return this.fragmentShaders.get(name)
  }
}
