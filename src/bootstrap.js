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
  return mod.default(javascriptVariant, log).then(({ default: initialize }) => initialize()).then((api) => {
    const globalApi = global && global.BLITPUNK
    if (globalApi) {
      Object.assign(globalApi, api)
      globalApi.initialize = () => Promise.resolve(globalApi)
      return globalApi
    }
    return api
  })
}

const initialize = () => loadPolyfills.then(loadApi)

export {
  initialize
}
