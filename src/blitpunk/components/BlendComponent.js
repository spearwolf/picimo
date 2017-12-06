import { BlendMode } from 'blitpunk/core'
import { debug } from 'common/log'

import {
  PRIO_RF_BLEND,
  PRIO_PRF_BEND
} from 'blitpunk/priorities'

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
    this._renderFrameId = entity.on('renderFrame', PRIO_RF_BLEND, this.renderFrame.bind(this))
    this._postRenderFrameId = entity.on('postRenderFrame', PRIO_PRF_BEND, this.postRenderFrame.bind(this))
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
