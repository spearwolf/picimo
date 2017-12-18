import {
  PreConditionExecutor,
  defineHiddenPropertyRO,
  defineHiddenPropertiesRW,
  definePublicPropertyRO
} from 'picimo/utils'

import { ShaderUniformVariable } from 'picimo/core'

import { info } from 'common/log'

import SpriteGroupElement from '../SpriteGroupElement'

import { ATTR_ROWS, ATTR_COLS, ATTR_VIEW_FIT } from '../constants'

import createVertices from './createVertices'
import updateViewFit from './updateViewFit'
import updateTexCoords from './updateTexCoords'
import spriteGroupConfig from './spriteGroupConfig'

import { DEFAULT_MESH_COLS, DEFAULT_MESH_ROWS, TEXTURE_SHADER_KEY } from './constants'

const PRE_CONDITION_ATTRS = [
  'spriteGroup',
  'textureId',
  'texture'
]

const createMesh = (el, { spriteGroup, textureId, texture }) => {
  info(`[picture] create mesh(${el.meshCols}x${el.meshRows}), textureId=${textureId}, spriteGroup=`, spriteGroup, el)

  const { meshRows, meshCols, sprites } = el

  spriteGroup.voPool.alloc(meshCols * meshRows, sprites)
  createVertices(el, 1.0, 1.0)
  el.transformUniform.value = [0, 0, 0]

  updateTextureId(spriteGroup, textureId)
  updateTexCoords(el, texture)
}

const updateTextureId = (spriteGroup, textureId) => {
  spriteGroup.setTexture(TEXTURE_SHADER_KEY, textureId)
}

const renderFrame = (el, webGlRenderer) => {
  if (el.hasAttribute(ATTR_VIEW_FIT)) {
    // TODO default value for view fit
    updateViewFit(el, webGlRenderer)
  }

  if (el.verticesUpdated) {
    el.spriteGroup.touchVertexBuffers()
    el.verticesUpdated = false
  }

  const { scaleUniform, transformUniform } = el
  const { shaderContext } = webGlRenderer

  shaderContext.pushVar(scaleUniform)
  shaderContext.pushVar(transformUniform)
  // TODO postRenderFrame -> popVars from shader contexts
}

export default class PictureElement extends SpriteGroupElement {
  /** @ignore */
  constructor (_) {
    const me = super(_)

    definePublicPropertyRO(me, 'sprites', [])
    definePublicPropertyRO(me, 'scaleUniform', new ShaderUniformVariable('scale'))
    definePublicPropertyRO(me, 'transformUniform', new ShaderUniformVariable('transform'))

    defineHiddenPropertiesRW(me, {
      verticesUpdated: false,
      lastViewWidth: -1,
      lastViewHeight: -1
    })

    defineHiddenPropertyRO(me, '_renderFrame', new PreConditionExecutor(me, PRE_CONDITION_ATTRS))
    me.entity.on('renderFrame', me._renderFrame.execute)

    me._renderFrame.on('initialize', attrs => createMesh(me, attrs))
    me._renderFrame.on('attributeChanged:textureId', textureId => updateTextureId(me.spriteGroup, textureId))
    me._renderFrame.on('attributeChanged:texture', texture => updateTexCoords(me, texture))
    me._renderFrame.on('execute', webGlRenderer => renderFrame(me, webGlRenderer))
    // TODO PreConditionExecutor -> execute('postRenderFrame', ...)

    return me
  }

  get textureId () {
    const { texture } = this.entity
    return texture && texture.textureId
  }

  get texture () {
    const { texture } = this.entity
    return texture && texture.texture
  }

  readSpriteGroupConfig () {
    const meshCols = parseInt(this.getAttribute(ATTR_COLS) || DEFAULT_MESH_COLS, 10)
    const meshRows = parseInt(this.getAttribute(ATTR_ROWS) || DEFAULT_MESH_ROWS, 10)

    return Object.assign({}, spriteGroupConfig, {
      meshCols,
      meshRows,
      capacity: meshCols * meshRows
    })
  }

  get meshCols () {
    return this._spriteGroupConfig && this._spriteGroupConfig.meshCols
  }

  get meshRows () {
    return this._spriteGroupConfig && this._spriteGroupConfig.meshRows
  }
}
