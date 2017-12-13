import {
  PreConditionExecutor,
  createVoPropsSetter,
  defineHiddenPropertyRO,
  definePublicPropertyRO
} from 'picimo/utils'

import { STATIC } from 'picimo/core/v_o_array'

import { info } from 'common/log'

import SpriteGroupElement from '../SpriteGroupElement'
import { ATTR_ROWS, ATTR_COLS } from '../constants'

const DEFAULT_MESH_COLS = 10
const DEFAULT_MESH_ROWS = 10

const SPRITE_GROUP_CONFIG = {
  descriptor: 'simple',
  vertexShader: 'simple',
  fragmentShader: 'simple',
  primitive: 'TRIANGLES',
  usage: STATIC,
  voNew: createVoPropsSetter({
    scale: 1,
    opacity: 1
  })
}

const MESH_WIDTH = 150 // TODO remove this - use current viewport/projection
const MESH_HEIGHT = 100

const TEXTURE_SHADER_KEY = 'tex'

const PRE_CONDITION_ATTRS = [
  'spriteGroup',
  'textureId',
  'texture'
]

const createMesh = (el, { spriteGroup, textureId, texture }) => {
  info(`[picture] create mesh(${el.meshCols}x${el.meshRows}), textureId=${textureId}, spriteGroup=`, spriteGroup, el)

  const { meshRows, meshCols, sprites } = el

  const sx = MESH_WIDTH / meshCols
  const sy = MESH_HEIGHT / meshRows

  // TODO set transform/size at every renderFrame

  for (let y = 0; y < meshRows; ++y) {
    for (let x = 0; x < meshCols; ++x) {
      const s = spriteGroup.voPool.alloc(1) // we don't have a texture so we don't need to call .createSprite() here
      sprites.push(s)

      s.setSize(sx, sy)
      s.setTranslate(-MESH_WIDTH / 2, -MESH_HEIGHT / 2)
      s.setPos2d(
        x * sx, (y + 1) * sy,
        (x + 1) * sx, (y + 1) * sy,
        (x + 1) * sx, y * sy,
        x * sx, y * sy
      )
    }
  }

  updateTextureId(spriteGroup, textureId)
  updateTexture(el, spriteGroup, texture)
}

const updateTextureId = (spriteGroup, textureId) => {
  spriteGroup.setTexture(TEXTURE_SHADER_KEY, textureId)
}

const updateTexture = ({ meshRows, meshCols, sprites }, spriteGroup, texture) => {
  const { maxS, maxT, minS, minT } = texture
  const tx = (maxS - minS) / meshCols
  const ty = (maxT - minT) / meshRows

  // TODO create vertex shader which transforms
  //  all tex coords by uniform vector

  for (let y = 0; y < meshRows; ++y) {
    for (let x = 0; x < meshCols; ++x) {
      const s = sprites[x + (y * meshCols)]

      // TODO extract to another setTexCoords helper
      const x0 = minS + (x * tx)
      const y0 = maxT - ((y + 1) * ty)
      const x1 = minS + ((x + 1) * tx)
      const y1 = maxT - (y * ty)
      s.setTexCoords(x0, y0, x1, y0, x1, y1, x0, y1)
    }
  }

  spriteGroup.touchVertexBuffers()
}

export default class PictureElement extends SpriteGroupElement {
  /** @ignore */
  constructor (_) {
    const me = super(_)

    definePublicPropertyRO(me, 'sprites', [])

    defineHiddenPropertyRO(me, '_renderFrame', new PreConditionExecutor(me, PRE_CONDITION_ATTRS))
    me.entity.on('renderFrame', me._renderFrame.execute)

    me._renderFrame.on('initialize', attrs => createMesh(me, attrs))
    me._renderFrame.on('attributeChanged:textureId', textureId => updateTextureId(me.spriteGroup, textureId))
    me._renderFrame.on('attributeChanged:texture', texture => updateTexture(me, me.spriteGroup, texture))

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

    return Object.assign({}, SPRITE_GROUP_CONFIG, {
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
