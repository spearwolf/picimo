import { destroy } from 'picimo/utils'

import Texture from './texture'
import TextureState from './texture_state'
import TextureAtlas from './texture_atlas'
import ShaderTexture2dVariable from './shader_texture_2d_variable'

export default class TextureLibrary {
  constructor () {
    this.states = new Map()
    this.shaderVars = new Map()
  }

  destroy () {
    destroy(this)
  }

  loadTexture (id, url = id, textureHints = undefined) {
    const state = new TextureState(Texture.load(url, textureHints))
    this.states.set(id, state)
    return state.promise
  }

  loadTextureAtlas (id, url = id, textureHints = undefined) {
    const textureAtlas = TextureAtlas.load(url, null, null, textureHints)
    const state = new TextureState(textureAtlas.then(atlas => {
      state.atlas = atlas
      return atlas.rootTexture
    }))
    this.states.set(id, state)
    return textureAtlas
  }

  getTexture (id) {
    return this.states.get(id)
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