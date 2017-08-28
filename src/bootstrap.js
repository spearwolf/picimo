/* global BLITPUNK_ENV */
import detectCustomElements from './bootstrap/detectCustomElements.js'
import detectJavascriptVariant from './bootstrap/detectJavascriptVariant.js'

const javascriptVariant = detectJavascriptVariant()
const needsCustomElementsPolyfill = !detectCustomElements()

const log = typeof console !== 'undefined' ? (
  typeof console.debug === 'function'
  ? (...args) => console.debug(...args)
  : (...args) => console.log(...args)
) : () => 1

log(`blitpunk bootstrap (${BLITPUNK_ENV})`, 'javascriptVariant=', javascriptVariant, 'needsCustomElementsPolyfill=', needsCustomElementsPolyfill)

const loadPolyfills = needsCustomElementsPolyfill
  ? import(
      /* webpackChunkName: "document-register-element" */
      'document-register-element/build/document-register-element.js'
    ).then(() => {
      log('loaded polyfill: customElements')
    })
  : Promise.resolve()

let loadBlitpunk
if (BLITPUNK_ENV === 'development') {
  loadBlitpunk = require('./bootstrap/importBlitpunkJsDev')
} else {
  loadBlitpunk = require('./bootstrap/importBlitpunkJsProd')
}
loadBlitpunk = loadBlitpunk.default(javascriptVariant, log).then(({ default: blitpunk }) => {
  log('loaded blitpunk', blitpunk)
  return blitpunk
})

export default loadPolyfills.then(loadBlitpunk)
