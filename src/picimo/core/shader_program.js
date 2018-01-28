import generateUUID from '../utils/generate_uuid'

export default class ShaderProgram {
  /**
   * @param {ShaderSource} vertexShader
   * @param {ShaderSource} fragmentShader
   */
  constructor (vertexShader, fragmentShader) {
    /**
     * @type {string}
     */
    this.id = generateUUID()

    /**
     * @type {ShaderSource}
     */
    this.vertexShader = vertexShader

    /**
     * @type {ShaderSource}
     */
    this.fragmentShader = fragmentShader
  }
}
