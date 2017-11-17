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

const loadApi = () => {
  let mod
  if (BLITPUNK_ENV === 'development') {
    mod = require('./bootstrap/importBlitpunkJsDev')
  } else {
    mod = require('./bootstrap/importBlitpunkJsProd')
  }
  return mod.default(javascriptVariant, log).then(({ default: whenReady }) => whenReady()).then((api) => {
    // log('blitpunk api', api)
    const publicApi = window.BLITPUNK
    Object.assign(publicApi, api)
    return publicApi
  })
}

const whenReady = () => loadPolyfills.then(loadApi)

export {
  whenReady
}
