import Texture from './texture'
import TextureState from './texture_state'
import ShaderTexture2dVariable from './shader_texture_2d_variable'
import ShaderVariableGroup from './shader_variable_group'

export default class TextureLibrary {
  constructor () {
    this.states = new Map()
    this.shaderVars = new Map()
  }

  loadTexture (id, url = id) {
    const state = new TextureState(Texture.load(url))
    this.states.set(id, state)
    return state.promise
  }

  whenReady (shaderTextureMap, onReady) {
    const shaderVars = []
    for (const shaderVarName of Object.keys(shaderTextureMap)) {
      const textureId = shaderTextureMap[shaderVarName]
      const state = this.states.get(textureId)
      if (state === undefined || !state.isReady) return

      let shaderVar = this.shaderVars.get(shaderVarName)
      if (shaderVar === undefined) {
        shaderVar = new ShaderTexture2dVariable(shaderVarName)
        this.shaderVars.set(shaderVarName, shaderVar)
      }

      shaderVar.texture = state.texture
      shaderVars.push(shaderVar)
    }
    onReady(new ShaderVariableGroup(shaderVars))
  }
}
