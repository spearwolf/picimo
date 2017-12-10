import { getDefaultOption } from 'blitpunk/utils'
import { PRIO_RF_CLEAR } from 'blitpunk/priorities'
import { debug } from 'common/log'

const tinycolor = require('tinycolor2')

const DEFAULT_COLOR = 'rgba(0,0,0,0)'
const DEFAULT_DEPTH = 1
const DEFAULT_STENCIL = 0
const DEFAULT_MASK = 'COLOR,DEPTH,STENCIL'

const PROPERTY_CLEAR_COLOR = 'color'
const PROPERTY_CLEAR_DEPTH = 'depth'
const PROPERTY_CLEAR_STENCIL = 'stencil'
const PROPERTY_MASK = 'mask'

const COLOR = 'COLOR'
const DEPTH = 'DEPTH'
const STENCIL = 'STENCIL'

const parseColor = colStr => colStr ? tinycolor(colStr) : null

const parseMask = str => {
  return {
    color: str.indexOf(COLOR) > -1,
    depth: str.indexOf(DEPTH) > -1,
    stencil: str.indexOf(STENCIL) > -1
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
    clearColor: parseColor(option(PROPERTY_CLEAR_COLOR, DEFAULT_COLOR)),
    clearDepth: option(PROPERTY_CLEAR_DEPTH, DEFAULT_DEPTH),
    clearStencil: option(PROPERTY_CLEAR_STENCIL, DEFAULT_STENCIL),
    mask: parseMask(option(PROPERTY_MASK, DEFAULT_MASK))
  }
}

export default class ClearComponent {
  constructor (entity, config) {
    Object.assign(this, parseConfig(config))
    debug('[clear] create', this)
  }

  update (config) {
    Object.assign(this, parseConfig(config))
    debug('[clear] update', this)
  }

  connectedEntity (entity) {
    entity.on('renderFrame', PRIO_RF_CLEAR, this)
  }

  disconnectedEntity (entity) {
    entity.off(this)
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
