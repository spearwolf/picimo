
/**
 * Group of shader variables.
 */
export default class ShaderVariableGroup {
  /**
  * @param {Array<ShaderVariable|ShaderVariableAlias>} shaderVars
   */
  constructor (shaderVars) {
    this.shaderVars = shaderVars
  }

  pushVar (shaderContext) {
    this.shaderVars.forEach(shaderContext.pushVar.bind(shaderContext))
  }

  popVar (shaderContext) {
    this.shaderVars.forEach(shaderContext.popVar.bind(shaderContext))
  }
}
