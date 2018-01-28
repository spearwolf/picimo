import ShaderVariableGroup from './shader_variable_group'
import ShaderTexture2dVariable from './shader_texture_2d_variable'

export default class ShaderTextureGroup {
  constructor (shaderLibrary, shaderTextureMap) {
    this.shaderLibrary = shaderLibrary
    this.waitFor = Object.keys(shaderTextureMap).map(shaderVarKey => ({
      shaderVarKey,
      textureId: shaderTextureMap[shaderVarKey],
      isLoaded: false
    }))
    this.shaderVarGroup = new ShaderVariableGroup([])
    this.shaderVarStore = new Map()
  }

  get isLoaded () {
    return this.waitFor.length === 0 && this.shaderVarGroup.shaderVars.length > 0
  }

  whenLoaded (onLoaded) {
    if (!this.isLoaded) {
      this.waitFor.forEach(waitFor => {
        if (!waitFor.isLoaded) {
          const state = this.shaderLibrary.states.get(waitFor.textureId)
          if (state === undefined || !state.isReady) return

          const shaderVar = new ShaderTexture2dVariable(waitFor.shaderVarKey)
          shaderVar.texture = state.texture
          this.shaderVarGroup.shaderVars.push(shaderVar)

          waitFor.isLoaded = true
        }
      })
      this.waitFor = this.waitFor.filter(waitFor => waitFor.isLoaded === false)
      if (this.isLoaded) {
        onLoaded(this.shaderVarGroup)
      }
    } else {
      onLoaded(this.shaderVarGroup)
    }
  }
}
