/* global customElements */
import log from 'common/log'

import defineCustomElements from './ce/defineCustomElements'
import { HTML_ELEMENT_ENTITY } from './ce/constants'
import * as publicApi from './api'

const initialize = () => {
  if (customElements.get(HTML_ELEMENT_ENTITY)) {
    log('picimo\'s custom elements have already been defined')
  } else {
    log('picimo\'s custom elements <pi-*/> have been defined')
    defineCustomElements()
  }

  return customElements.whenDefined(HTML_ELEMENT_ENTITY).then(() => publicApi)
}

/** @private */
export default initialize
