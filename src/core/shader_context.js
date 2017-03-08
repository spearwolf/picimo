import ShaderVariable from './shader_variable'
import ShaderVariableGroup from './shader_variable_group'

/**
 * A ShaderContext keeps named references to all shader _variables_
 * to make them available for shader _programs_.
 * Each named reference is organized as a _stack_ where you can push
 * or pop shader variable _values_.
 */
export default class ShaderContext {
  constructor () {
    this.uniform = new Map()
    this.attrib = new Map()
    this.tex2d = new Map()
  }

  clear () {
    this.uniform.clear()
    this.attrib.clear()
    this.tex2d.clear()
  }

  /**
   * @param {ShaderVariable|ShaderVariableGroup} shaderVariable
   */
  pushVar (shaderVariable) {
    if (shaderVariable instanceof ShaderVariableGroup) {
      shaderVariable.pushVar(this)
    } else {
      const lane = shaderVarLane(this, shaderVariable.type, shaderVariable.name)
      lane.push(shaderVariable)
    }
  }

  /**
   * Remove current shader variable plus all later set variables from named shader variable stack.
   * @param {ShaderVariable|ShaderVariableGroup} shaderVariable
   */
  popVar (shaderVariable) {
    if (shaderVariable instanceof ShaderVariableGroup) {
      shaderVariable.popVar(this)
    } else {
      const lane = shaderVarLane(this, shaderVariable.type, shaderVariable.name)
      const len = lane.length
      for (let i = 0; i < len; ++i) {
        if (lane[i] === shaderVariable) {
          lane.length = i
          return
        }
      }
    }
  }

  /**
   * Return current shader variable by name and type.
   * @param {ShaderVariable} shaderVariable
   * @return {ShaderVariable} or `null`
   */
  curVar (shaderVariable) {
    const lane = shaderVarMap(this, shaderVariable.type).get(shaderVariable.name)
    return lane && lane.length ? lane[lane.length - 1] : null
  }

  /**
   * Return current _uniform_ shader variable by name.
   * @param {string} name
   * @return {ShaderUniformVariable} or `null`
   */
  curUniform (name) {
    const lane = this.uniform.get(name)
    return lane && lane.length ? lane[lane.length - 1] : null
  }

  /**
   * Return current _attribute_ shader variable by name.
   * @param {string} name
   * @return {ShaderAttribVariable} or `null`
   */
  curAttrib (name) {
    const lane = this.attrib.get(name)
    return lane && lane.length ? lane[lane.length - 1] : null
  }

  /**
   * Return current _texture2d_ shader variable by name.
   * @param {string} name
   * @return {ShaderTexture2dVariable} or `null`
   */
  curTex2d (name) {
    const lane = this.tex2d.get(name)
    return lane && lane.length ? lane[lane.length - 1] : null
  }
}

function shaderVarMap (shaderContext, type) {
  switch (type) {
    case ShaderVariable.TYPE.UNIFORM: return shaderContext.uniform
    case ShaderVariable.TYPE.ATTRIB: return shaderContext.attrib
    case ShaderVariable.TYPE.TEXTURE_2D: return shaderContext.tex2d
  }
}

function shaderVarLane (shaderContext, type, name) {
  const map = shaderVarMap(shaderContext, type)
  let lane = map.get(name)

  if (!lane) {
    lane = []
    map.set(name, lane)
  }

  return lane
}
