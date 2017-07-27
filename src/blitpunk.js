import defineCustomElements from './dom/defineCustomElements.js'
import App from './app'

const BLITPLUNK_CUSTOM_ELEMENTS_DEFINED = Symbol.for('BLITPLUNK_CUSTOM_ELEMENTS_DEFINED')

if (!window[BLITPLUNK_CUSTOM_ELEMENTS_DEFINED]) {
  window[BLITPLUNK_CUSTOM_ELEMENTS_DEFINED] = true
  defineCustomElements()
}

const api = function () {
  return new App()
}

export default api
