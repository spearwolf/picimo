/* global customElements */
import defineCustomElements from './dom/defineCustomElements.js'
import * as publicApi from './api'
import { DOM_ELEM_CANVAS } from './dom/constants'
import log from './common/log.js'

if (customElements.get(DOM_ELEM_CANVAS)) {
  log('<blitpunk> custom elements have already been defined')
} else {
  log('<blitpunk> custom elements are now defined')
  defineCustomElements()
}

const initialize = customElements.whenDefined(DOM_ELEM_CANVAS).then(() => publicApi)

export default () => initialize
export * from './api'
