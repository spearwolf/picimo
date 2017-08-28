/* global BLITPUNK_ENV */
import detectCustomElements from './bootstrap/detectCustomElements.js'
import detectJavascriptVariant from './bootstrap/detectJavascriptVariant.js'
import log from './log.js'

const javascriptVariant = detectJavascriptVariant()
const needsCustomElementsPolyfill = !detectCustomElements()

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
loadBlitpunk = loadBlitpunk.default(javascriptVariant, log).then(({ default: whenReady }) => whenReady).then((blitpunkApi) => {
  log('loaded blitpunk', blitpunkApi)
  const publicApi = window.blitpunk
  Object.assign(publicApi, blitpunkApi)
  return publicApi
})

const whenReady = () => loadPolyfills.then(() => loadBlitpunk)

export {
  whenReady
}
