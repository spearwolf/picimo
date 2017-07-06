import Texture from './texture'
import TextureState from './texture_state'
import TextureAtlas from './texture_atlas'
import ShaderTexture2dVariable from './shader_texture_2d_variable'

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

  loadTextureAtlas (id, url = id) {
    const atlas = TextureAtlas.load(url)
    const state = new TextureState(atlas.then((atlas) => atlas.rootTexture))
    this.states.set(id, state)
    return atlas
  }

  whenLoaded (textureId, shaderVarKey, onLoaded) {
    const state = this.states.get(textureId)
    if (state === undefined || !state.isReady) return

    let shaderVar = this.shaderVars.get(shaderVarKey)
    if (shaderVar === undefined) {
      shaderVar = new ShaderTexture2dVariable(shaderVarKey)
      this.shaderVars.set(shaderVarKey, shaderVar)
    }

    shaderVar.texture = state.texture
    onLoaded(shaderVar)
  }
}
