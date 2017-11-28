import { BlendMode } from 'blitpunk/core'
import { debug } from 'common/log'

import {
  COMPONENT_PRIORITY_BLEND,
  COMPONENT_PRIORITY_POST_BLEND
} from './constants'

const parseBlendData = (data) => ({
  enable: (typeof data === 'object' ? (data.enable === undefined ? true : Boolean(data.enable)) : false),
  sfactor: (typeof data === 'object' ? (typeof data.sfactor === 'string' ? data.sfactor : '') : ''),
  dfactor: (typeof data === 'object' ? (typeof data.dfactor === 'string' ? data.dfactor : '') : '')
})

const createBlendMode = ({ enable, sfactor, dfactor }) => {
  return new BlendMode(enable, sfactor, dfactor)
}

const updateBlendMode = (blendMode, { enable, sfactor, dfactor }) => {
  blendMode.enable = enable
  blendMode.sfactor = sfactor
  blendMode.dfactor = dfactor
}

export default class BlendComponent {
  constructor (entity, data) {
    this.blendMode = createBlendMode(parseBlendData(data))
  }

  update (data) {
    updateBlendMode(this.blendMode, parseBlendData(data))
  }

  connectedEntity (entity) {
    debug('[blend] connected', this)

    this._renderFrameId = entity.on('renderFrame', COMPONENT_PRIORITY_BLEND, this.renderFrame.bind(this))
    this._postRenderFrameId = entity.on('postRenderFrame', COMPONENT_PRIORITY_POST_BLEND, this.postRenderFrame.bind(this))
  }

  disconnectedEntity (entity) {
    debug('[blend] disconnected', this)

    if (this._renderFrameId) entity.off(this._renderFrameId)
    if (this._postRenderFrameId) entity.off(this._postRenderFrameId)
  }

  renderFrame (renderer) {
    renderer.pushBlendMode(this.blendMode)
  }

  postRenderFrame (renderer) {
    renderer.popBlendMode()
  }
}
