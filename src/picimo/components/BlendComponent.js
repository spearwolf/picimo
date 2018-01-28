import { BlendMode } from 'picimo/core'

import {
  PRIO_RF_BLEND,
  PRIO_PRF_BLEND
} from 'picimo/priorities'

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
  }

  update (data) {
    Object.assign(this.blendMode, parseBlendData(data))
  }

  connectedEntity (entity) {
    entity.on('renderFrame', PRIO_RF_BLEND, this)
    entity.on('postRenderFrame', PRIO_PRF_BLEND, this)
  }

  disconnectedEntity (entity) {
    entity.off(this)
  }

  renderFrame (renderer) {
    renderer.pushBlendMode(this.blendMode)
  }

  postRenderFrame (renderer) {
    renderer.popBlendMode()
  }
}
