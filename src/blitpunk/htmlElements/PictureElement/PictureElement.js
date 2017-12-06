import { PreConditionExecutor } from 'blitpunk/utils'
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
  voNew: {
    scale: 1,
    opacity: 1
  }
}

const TEXTURE_SHADER_KEY = 'tex'

const createMesh = (el, { spriteGroup, textureId }) => {
  info(`[picture] create mesh(${el.meshCols}x${el.meshRows}), textureId=${textureId}, spriteGroup=`, spriteGroup, el)

  updateTexture(spriteGroup, textureId)
}

const updateTexture = (spriteGroup, textureId) => {
  info(`[picture] textureId=${textureId}`)

  spriteGroup.setTexture(TEXTURE_SHADER_KEY, textureId)
}

export default class PictureElement extends SpriteGroupElement {
  /** @ignore */
  constructor (_) {
    const self = super(_)

    Object.defineProperties(self, {
      _renderFrame: {
        value: new PreConditionExecutor(self, ['spriteGroup', 'textureId'])
      },
      sprites: {
        value: [],
        enumerable: true
      }
    })

    self.entity.on('renderFrame', self._renderFrame.execute)
    self._renderFrame.on('initialize', attrs => createMesh(self, attrs))
    self._renderFrame.on('attributeChanged:textureId', textureId => updateTexture(self.spriteGroup, textureId))

    return self
  }

  get textureId () {
    const tex = this.entity.texture
    return tex && tex.textureId
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
