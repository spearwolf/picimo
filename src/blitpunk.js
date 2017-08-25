/* global customElements */
import defineCustomElements from './dom/defineCustomElements.js'
import sample from './utils/sample'
import { DOM_ELEM_CANVAS } from './dom/constants'

if (customElements.get(DOM_ELEM_CANVAS)) {
  console.log('custom elements for <blitpunk> aleady defined!')
} else {
  console.log('defining custom elements for <blitpunk>')
  defineCustomElements()
}

const publicApi = {
  utils: {
    sample
  }
}

publicApi.whenReady = customElements.whenDefined(DOM_ELEM_CANVAS).then(() => publicApi)

export default publicApi
