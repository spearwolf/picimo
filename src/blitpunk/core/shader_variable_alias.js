/**
 * Shader attribute variable *alias*.
 */
export default class ShaderVariableAlias {
  /**
   * @param {string} name
   * @param {number|Object} value
   */
  constructor (name, shaderVar) {
    this.name = name
    this.shaderVar = shaderVar
  }

  get type () {
    return this.shaderVar.type
  }

  get value () {
    return this.shaderVar.value
  }

  get serial () {
    return this.shaderVar.serial
  }
}
