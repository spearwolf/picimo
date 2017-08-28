/* global customElements */
import defineCustomElements from './dom/defineCustomElements.js'
import sample from './utils/sample'
import { DOM_ELEM_CANVAS } from './dom/constants'
import log from './log.js'

if (customElements.get(DOM_ELEM_CANVAS)) {
  log('custom elements for <blitpunk> aleady defined!')
} else {
  log('defining custom elements for <blitpunk>')
  defineCustomElements()
}

const publicApi = {
  utils: {
    sample
  }
}

const whenReady = customElements.whenDefined(DOM_ELEM_CANVAS).then(() => {
  log('<blitpunk> elements are defined!')
  return publicApi
})

export default whenReady
