import ElementIndexArray from './element_index_array'
import ShaderProgram from './shader_program'
import ShaderTextureGroup from './shader_texture_group'
import ShaderVariableBufferGroup from './shader_variable_buffer_group'
import VOPool from './v_o_pool'

const pick = require('lodash/pick')

const getVO = (descriptor, opt) => {
  if (typeof opt === 'function') {
    const vo = descriptor.createVO()
    opt(vo)
    return vo
  }
  return opt
}

export default class SpriteGroup {
  constructor (resourceLibrary, textureLibrary, options) {
    this.resourceLibrary = resourceLibrary
    this.textureLibrary = textureLibrary
    this.descriptor = resourceLibrary.findDescriptor(options.descriptor)
    this.voPool = new VOPool(this.descriptor, Object.assign(pick(options, [
      'capacity',
      'usage',
      'maxAllocVOSize',
      'voArray'
    ]), {
      voNew: getVO(this.descriptor, options.voNew),
      voZero: getVO(this.descriptor, options.voZero)
    }))
    this.voPoolShaderAttribs = new ShaderVariableBufferGroup(this.voPool)
    this.indices = options.indices || ElementIndexArray.Generate(this.voPool.capacity,
      [0, 1, 2, 0, 2, 3], 4  // quads
      // TODO create ElementIndexArray factories! capacity=N, type=quads, ...
    )
    this.shaderProgram = new ShaderProgram(
      resourceLibrary.findVertexShader(options.vertexShader),
      resourceLibrary.findFragmentShader(options.fragmentShader))
    this.primitive = options.primitive
    this.textures = Object.assign({}, options.textures)
    this.shaderTextureGroup = null
  }

  get capacity () { return this.voPool.capacity }

  get usedCount () { return this.voPool.usedCount }
  get availableCount () { return this.voPool.availableCount }

  setTexture (sampler, textureId) {
    if (this.textures[sampler] !== textureId) {
      this.textures[sampler] = textureId
      this.shaderTextureGroup = null
    }
  }

  loadTextureAtlas (sampler, url) {
    this.textures[sampler] = url
    this.shaderTextureGroup = null
    return this.textureLibrary.loadTextureAtlas(url)
  }

  getTextureAtlas (sampler) {
    return this.textureLibrary.getTextureAtlas(this.textures[sampler])
  }

  createSprite (texture, width, height) {
    const vo = this.voPool.alloc(1)
    if (texture != null) {
      const w = width || texture.width
      const h = height || texture.height
      vo.setSize(w, h)
      vo.setTexCoordsByTexture(texture)
    }
    return vo
  }

  renderFrame (renderer) {
    if (this.shaderTextureGroup == null) {
      this.shaderTextureGroup = new ShaderTextureGroup(this.textureLibrary, this.textures)
    }
    this.shaderTextureGroup.whenLoaded(texUniforms => {
      const { shaderContext } = renderer

      shaderContext.pushVar(texUniforms)
      shaderContext.pushVar(this.voPoolShaderAttribs)

      renderer.useShaderProgram(this.shaderProgram)

      renderer.drawIndexed(this.primitive, this.indices)
    })
  }
}
