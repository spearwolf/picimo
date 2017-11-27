import { getDefaultOption } from 'blitpunk/utils'
import { debug } from 'common/log'
import { COMP_PRIO_CLEAR } from '../constants'

const tinycolor = require('tinycolor2')

const DEFAULT_COLOR = 'rgba(0,0,0,0)'
const DEFAULT_DEPTH = 1
const DEFAULT_STENCIL = 0
const DEFAULT_MASK = 'COLOR,DEPTH,STENCIL'

const parseColor = colStr => colStr ? tinycolor(colStr) : null

const parseMask = str => {
  return {
    color: str.indexOf('COLOR') > -1,
    depth: str.indexOf('DEPTH') > -1,
    stencil: str.indexOf('STENCIL') > -1
  }
}

const parseConfig = (props) => {
  if (!props || typeof props === 'string') {
    return {
      clearColor: parseColor(props || DEFAULT_COLOR),
      clearDepth: DEFAULT_DEPTH,
      clearStencil: DEFAULT_STENCIL,
      mask: parseMask(DEFAULT_MASK)
    }
  }

  const option = getDefaultOption.bind(null, props)
  return {
    clearColor: parseColor(option('color', DEFAULT_COLOR)),
    clearDepth: option('depth', DEFAULT_DEPTH),
    clearStencil: option('stencil', DEFAULT_STENCIL),
    mask: parseMask(option('mask', DEFAULT_MASK))
  }
}

export default class ClearComponent {
  constructor (entity, config) {
    this.update(config)
  }

  update (config) {
    Object.assign(this, parseConfig(config))
  }

  connectedEntity (entity) {
    debug('[clear] connected', this)

    this._renderFrameId = entity.on('renderFrame', COMP_PRIO_CLEAR, this.renderFrame.bind(this))
  }

  disconnectedEntity (entity) {
    debug('[clear] disconnected', this)

    if (this._renderFrameId) entity.off(this._renderFrameId)
  }

  renderFrame (renderer) {
    const { clearBuffer } = renderer

    clearBuffer.clearDepth = this.clearDepth
    clearBuffer.clearStencil = this.clearStencil

    clearBuffer.setClearColor(this.clearColor)

    const { mask: { color, depth, stencil } } = this
    clearBuffer.setClearMask(color, depth, stencil)

    clearBuffer.clear()
  }
}
