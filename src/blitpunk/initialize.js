/* global customElements */
import defineCustomElements from './dom/defineCustomElements'
import * as publicApi from './api'
import { DOM_ELEM_CANVAS } from './dom/constants'
import log from '../common/log'

const initialize = () => {
  if (customElements.get(DOM_ELEM_CANVAS)) {
    log('<blitpunk> custom elements have already been defined')
  } else {
    log('<blitpunk> custom elements are now defined')
    defineCustomElements()
  }

  return customElements.whenDefined(DOM_ELEM_CANVAS).then(() => publicApi)
}

export default initialize
