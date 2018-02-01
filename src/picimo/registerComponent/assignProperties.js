import { isString } from 'picimo/utils'

import {
  SELECTOR_REGEX,
  RESERVED_SELECTOR_NAMES
} from './constants'

import queryDeferredProperty from './queryDeferredProperty'

export default (component, props, checkComponentCreated) => {
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (isString(value)) {
        const m = value.match(SELECTOR_REGEX)
        if (m) {
          if (!RESERVED_SELECTOR_NAMES.includes(m[0])) {
            queryDeferredProperty(m[1], m[2], component, key, checkComponentCreated)
            return
          }
        }
      }
      component[key] = value
    })
  }
  checkComponentCreated()
}
