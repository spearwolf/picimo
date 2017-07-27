import defineBlitpElements from './dom/define_blitp_elements'
import App from './app'

const BLITPUNK_ELEMENTS_ARE_DEFINED = Symbol.for('BLITPUNK_ELEMENTS_ARE_DEFINED')

if (!window[BLITPUNK_ELEMENTS_ARE_DEFINED]) {
  window[BLITPUNK_ELEMENTS_ARE_DEFINED] = true
  defineBlitpElements()
}

const api = function () {
  return new App()
}

export default api
