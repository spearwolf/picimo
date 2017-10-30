import Texture from './texture'
import TextureState from './texture_state'
import TextureAtlas from './texture_atlas'
import ShaderTexture2dVariable from './shader_texture_2d_variable'
import destroy from '../utils/destroy'

export default class TextureLibrary {
  constructor () {
    this.states = new Map()
    this.shaderVars = new Map()
  }

  destroy () {
    this.states.clear()
    this.shaderVars.clear()
    destroy(this)
  }

  loadTexture (id, url = id, textureHints = undefined) {
    const state = new TextureState(Texture.load(url, textureHints))
    this.states.set(id, state)
    return state.promise
  }

  loadTextureAtlas (id, url = id, textureHints = undefined) {
    const atlas = TextureAtlas.load(url, null, null, textureHints)
    const state = new TextureState(atlas.then((atlas) => {
      state.atlas = atlas
      return atlas.rootTexture
    }))
    this.states.set(id, state)
    return atlas
  }

  getTextureAtlas (id) {
    return this.states.get(id).atlas
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
