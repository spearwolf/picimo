import ComponentRegistry from './ecs/component_registry'
import EntityManager from './ecs/entity_manager'
import ResourceLibrary from './core/resource_library'
import TextureLibrary from './core/texture_library'

import defineBlitpElements from './dom/define_blitp_elements'

const BLITPUNK_ELEMENTS_ARE_DEFINED = Symbol.for('BLITPUNK_ELEMENTS_ARE_DEFINED')

if (!window[BLITPUNK_ELEMENTS_ARE_DEFINED]) {
  window[BLITPUNK_ELEMENTS_ARE_DEFINED] = true
  defineBlitpElements()
}

class App {
  constructor () {
    this.components = new ComponentRegistry()
    this.entities = new EntityManager()
    this.resouces = new ResourceLibrary()
    this.textures = new TextureLibrary()
    // TODO - console.log welcome
  }

  // TODO add .use(middleware) support
}

const api = function () {
  return new App()
}

Object.assign(api, {
  ComponentRegistry,
  EntityManager,
  ResourceLibrary,
  TextureLibrary
})

export default api
