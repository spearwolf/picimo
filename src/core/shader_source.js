/* global HTMLElement */
import generateUUID from '../utils/generate_uuid'

export default class ShaderSource {
  /**
   * @param {string} type - `VERTEX_SHADER` or `FRAGMENT_SHADER`
   * @param {HTMLElement|string} source
   */
  constructor (type, source) {
    /**
     * @type {string}
     */
    this.id = generateUUID()

    this.type = type

    /**
     * @type {string}
     */
    this.source = source instanceof HTMLElement ? source.textContent : source.toString()
  }
}

ShaderSource.VERTEX_SHADER = 'VERTEX_SHADER'
ShaderSource.FRAGMENT_SHADER = 'FRAGMENT_SHADER'
