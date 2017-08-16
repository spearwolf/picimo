import defineCustomElements from './dom/defineCustomElements.js'
import App from './app'
import sample from './utils/sample'

const BLITPLUNK_CUSTOM_ELEMENTS_DEFINED = Symbol.for('BLITPLUNK_CUSTOM_ELEMENTS_DEFINED')

if (!window[BLITPLUNK_CUSTOM_ELEMENTS_DEFINED]) {
  window[BLITPLUNK_CUSTOM_ELEMENTS_DEFINED] = true
  defineCustomElements()
}

const api = function () {
  return new App()
}

const utils = {
  sample
}

export default api
export { utils }
