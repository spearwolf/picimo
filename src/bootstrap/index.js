/* global PICIMO_ENV */
import { info, debug } from '../common/log'
import queryEntity from '../common/queryEntity'
import detectCustomElements from './detectCustomElements'
import detectJavascriptVariant from './detectJavascriptVariant'
import makeRegisterComponent from './makeRegisterComponent'

const javascriptVariant = detectJavascriptVariant()
const needsCustomElementsPolyfill = !detectCustomElements()

info(`picimo bootstrap (${PICIMO_ENV})`, 'javascriptVariant=', javascriptVariant, 'needsCustomElementsPolyfill=', needsCustomElementsPolyfill)

const loadPolyfills = needsCustomElementsPolyfill
  ? import(
      /* webpackChunkName: "document-register-element" */
      'document-register-element/build/document-register-element.js'
    ).then(() => {
      debug('loaded polyfill: customElements')
    })
  : Promise.resolve()

const loadApi = () => require('./loadPicimo').default(javascriptVariant).then(({ default: initialize }) => initialize()).then((api) => {
  const globalApi = global && global.PICIMO
  if (globalApi) {
    Object.assign(globalApi, api)
    globalApi.initialize = () => Promise.resolve(globalApi)
    return globalApi
  }
  return api
})

const preLoad = loadPolyfills.then(loadApi)
const initialize = () => preLoad
const registerComponent = makeRegisterComponent(initialize)

export {
  initialize,
  queryEntity,
  registerComponent
}
