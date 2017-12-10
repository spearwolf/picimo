/* global customElements */
import log from 'common/log'

import defineCustomElements from './htmlElements/defineCustomElements'
import { HTML_ELEMENT_ENTITY } from './htmlElements/constants'
import * as publicApi from './api'

const initialize = () => {
  if (customElements.get(HTML_ELEMENT_ENTITY)) {
    log('picimo\'s custom elements have already been defined')
  } else {
    log('picimo\'s custom elements <pi-*/> have beed defined')
    defineCustomElements()
  }

  return customElements.whenDefined(HTML_ELEMENT_ENTITY).then(() => publicApi)
}

export default initialize
