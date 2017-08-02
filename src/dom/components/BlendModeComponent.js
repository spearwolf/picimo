import BlendMode from '../../core/blend_mode'

import {
  COMP_PRIO_BLEND_BEFORE,
  COMP_PRIO_BLEND_AFTER
} from '../constants'

const parseBlendModeData = (data) => ({
  enable: (typeof data === 'object' ? (
    data.enable === undefined ? true : !!data.enable
  ) : false),
  sfactor: (typeof data === 'object' ? (
    typeof data.sfactor === 'string' ? data.sfactor : ''
  ) : ''),
  dfactor: (typeof data === 'object' ? (
    typeof data.dfactor === 'string' ? data.dfactor : ''
  ) : '')
})

class BeforeChildren {
  constructor (blendMode) {
    this.blendMode = blendMode
  }

  renderFrame (renderer) {
    renderer.pushBlendMode(this.blendMode)
  }
}

class AfterChildren {
  renderFrame (renderer) {
    renderer.popBlendMode()
  }
}

export default class BlendModeComponent {
  constructor (entity, data) {
    const { enable, sfactor, dfactor } = parseBlendModeData(data)
    this.blendMode = new BlendMode(enable, sfactor, dfactor)
    this.beforeChildren = new BeforeChildren(this.blendMode)
    this.afterChildren = new AfterChildren()
    entity.on('*', COMP_PRIO_BLEND_BEFORE, this.beforeChildren)
    entity.on('*', COMP_PRIO_BLEND_AFTER, this.afterChildren)
    entity.on('debug', this)
  }

  debug () {
    console.dir(this.blendMode)
  }

  update (data) {
    const { enable, sfactor, dfactor } = parseBlendModeData(data)
    this.blendMode.enable = enable
    this.blendMode.sfactor = sfactor
    this.blendMode.dfactor = dfactor
  }

  disconnectedEntity (entity) {
    console.log('BlendModeComponent.disconnectedEntity(', entity, ')')
    entity.off(this.afterChildren)
    entity.off(this.beforeChildren)
    entity.off(this)
  }
}
