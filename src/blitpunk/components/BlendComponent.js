import { BlendMode } from 'blitpunk/core'
import { debug } from 'common/log'

import {
  COMPONENT_PRIORITY_BLEND,
  COMPONENT_PRIORITY_POST_BLEND
} from './constants'

const getOnlyIfString = value => typeof value === 'string' ? value : undefined

const parseBlendData = data => ({
  enable: (data.enable === undefined ? true : Boolean(data.enable)),
  sfactor: getOnlyIfString(data.sfactor),
  dfactor: getOnlyIfString(data.dfactor)
})

const createBlendMode = ({ enable, sfactor, dfactor }) => {
  return new BlendMode(enable, sfactor, dfactor)
}

export default class BlendComponent {
  constructor (entity, data) {
    this.blendMode = createBlendMode(parseBlendData(data))
    debug('[blend] create', this)
  }

  update (data) {
    Object.assign(this.blendMode, parseBlendData(data))
    debug('[blend] update', this)
  }

  connectedEntity (entity) {
    this._renderFrameId = entity.on('renderFrame', COMPONENT_PRIORITY_BLEND, this.renderFrame.bind(this))
    this._postRenderFrameId = entity.on('postRenderFrame', COMPONENT_PRIORITY_POST_BLEND, this.postRenderFrame.bind(this))
  }

  disconnectedEntity (entity) {
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
