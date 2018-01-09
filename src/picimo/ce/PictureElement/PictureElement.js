import {
  PreConditionExecutor,
  defineHiddenPropertiesRW,
  defineHiddenPropertyRO,
  definePublicPropertiesRO
} from 'picimo/utils'

import { ShaderUniformVariable } from 'picimo/core'

import SpriteGroupElement from '../SpriteGroupElement'

import { ATTR_ROWS, ATTR_COLS } from '../constants'

import spriteGroupConfig from './spriteGroupConfig'
import Picture from './Picture'

import { DEFAULT_MESH_COLS, DEFAULT_MESH_ROWS } from './constants'

const PRE_CONDITION_ATTRS = [
  'spriteGroup',
  'textureId',
  'texture'
]

export default class PictureElement extends SpriteGroupElement {
  /** @ignore */
  constructor (_) {
    const me = super(_)

    definePublicPropertiesRO(me, {
      sprites: [],
      scaleUniform: new ShaderUniformVariable('scale'),
      transformUniform: new ShaderUniformVariable('transform')
    })

    defineHiddenPropertiesRW(me, {
      verticesUpdated: false,
      viewFitNeedsUpdate: true,
      lastViewWidth: -1,
      lastViewHeight: -1,
      lastViewFit: ''
    })

    me.entity.retain('pictureMeshCreated')

    const executor = new PreConditionExecutor(me, PRE_CONDITION_ATTRS)
    defineHiddenPropertyRO(me, 'renderFrameExecutor', executor)

    const { entity } = me
    entity.on('renderFrame', executor.execute('renderFrame'))
    entity.on('postRenderFrame', executor.execute('postRenderFrame'))
    executor.on(new Picture(this))

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
