import {
  PreConditionExecutor,
  createVoPropsSetter,
  defineHiddenPropertyRO,
  defineHiddenPropertiesRW,
  definePublicPropertyRO
} from 'picimo/utils'

import { STATIC } from 'picimo/core/v_o_array'

import { info } from 'common/log'

import SpriteGroupElement from '../SpriteGroupElement'
import { ATTR_ROWS, ATTR_COLS, ATTR_VIEW_FIT } from '../constants'

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

// const VIEW_FIT_CONTAIN = 'contain'
const VIEW_FIT_COVER = 'cover'
const VIEW_FIT_FILL = 'fill'

const TEXTURE_SHADER_KEY = 'tex'

const PRE_CONDITION_ATTRS = [
  'spriteGroup',
  'textureId',
  'texture'
]

const createMesh = (el, { spriteGroup, textureId, texture }) => {
  info(`[picture] create mesh(${el.meshCols}x${el.meshRows}), textureId=${textureId}, spriteGroup=`, spriteGroup, el)

  const { meshRows, meshCols, sprites } = el

  spriteGroup.voPool.alloc(meshCols * meshRows, sprites)

  updateTextureId(spriteGroup, textureId)
  updateTexCoords(el, spriteGroup, texture)
}

const updateVertices = (el, targetWidth, targetHeight) => {
  const { meshRows, meshCols, sprites } = el

  // TODO set transform/size uniform at every renderFrame

  const sx = targetWidth / meshCols
  const sy = targetHeight / meshRows
  const ox = -targetWidth / 2
  const oy = -targetHeight / 2

  for (let y = 0; y < meshRows; ++y) {
    for (let x = 0; x < meshCols; ++x) {
      const s = sprites[x + (y * meshCols)]

      s.setTranslate(0, 0)
      s.setPos2d(
        ox + (x * sx), oy + ((y + 1) * sy),
        ox + ((x + 1) * sx), oy + ((y + 1) * sy),
        ox + ((x + 1) * sx), oy + (y * sy),
        ox + (x * sx), oy + (y * sy)
      )
    }
  }

  el.verticesUpdated = true
}

const updateTextureId = (spriteGroup, textureId) => {
  spriteGroup.setTexture(TEXTURE_SHADER_KEY, textureId)
}

const updateTexCoords = (el, spriteGroup, texture) => {
  const { meshRows, meshCols, sprites } = el
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

  el.verticesUpdated = true
}

const updateViewFit = (el, webGlRenderer) => {
  const projectionOrViewport = webGlRenderer.context.get('projection') || webGlRenderer.viewport
  const {
    width: viewWidth,
    height: viewHeight
  } = projectionOrViewport

  if (el.lastViewWidth !== viewWidth || el.lastViewHeight !== viewHeight) {
    el.lastViewWidth = viewWidth
    el.lastViewHeight = viewHeight

    const viewFit = el.getAttribute(ATTR_VIEW_FIT)

    let targetWidth
    let targetHeight

    if (VIEW_FIT_FILL === viewFit) {
      targetWidth = viewWidth
      targetHeight = viewHeight
    } else {
      const { width: texWidth, height: texHeight } = el.texture
      const viewRatio = viewHeight / viewWidth
      const texRatio = texHeight / texWidth

      if (texRatio === 1) {
        if (VIEW_FIT_COVER === viewFit) {
          targetHeight = targetWidth = viewRatio > 1 ? viewHeight : viewWidth
        } else { // 'contain'
          targetHeight = targetWidth = viewRatio < 1 ? viewHeight : viewWidth
        }
      } else {
        let scale

        if (VIEW_FIT_COVER === viewFit) {
          scale = texRatio > viewRatio ? viewWidth / texWidth : viewHeight / texHeight
        } else { // "contain"
          scale = texRatio < viewRatio ? viewWidth / texWidth : viewHeight / texHeight
        }

        targetWidth = scale * texWidth
        targetHeight = scale * texHeight
      }
    }

    updateVertices(el, targetWidth, targetHeight)

    console.log('TODO picture target size:', viewFit, '->', targetWidth, 'x', targetHeight, 'view ->', viewWidth, viewHeight)
  }
}

const renderFrame = (el, webGlRenderer) => {
  if (el.hasAttribute(ATTR_VIEW_FIT)) {
    updateViewFit(el, webGlRenderer)
  }

  if (el.verticesUpdated) {
    el.spriteGroup.touchVertexBuffers()
    el.verticesUpdated = false
  }
}

export default class PictureElement extends SpriteGroupElement {
  /** @ignore */
  constructor (_) {
    const me = super(_)

    definePublicPropertyRO(me, 'sprites', [])

    defineHiddenPropertiesRW(me, {
      verticesUpdated: false,
      lastViewWidth: -1,
      lastViewHeight: -1
    })

    defineHiddenPropertyRO(me, '_renderFrame', new PreConditionExecutor(me, PRE_CONDITION_ATTRS))
    me.entity.on('renderFrame', me._renderFrame.execute)

    me._renderFrame.on('initialize', attrs => createMesh(me, attrs))
    me._renderFrame.on('attributeChanged:textureId', textureId => updateTextureId(me.spriteGroup, textureId))
    me._renderFrame.on('attributeChanged:texture', texture => updateTexCoords(me, me.spriteGroup, texture))
    me._renderFrame.on('execute', webGlRenderer => renderFrame(me, webGlRenderer))

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
