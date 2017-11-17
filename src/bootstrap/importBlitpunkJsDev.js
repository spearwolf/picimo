
export default (javascriptVariant, log) => {
  let jsImport
  switch (javascriptVariant) {
    case 'modern':
      log('fetching variant: modern')
      jsImport = import(
        /* webpackChunkName: "modern-dev" */
        'blitpunk-dev-modern.js'
      )
      break
    case 'safari':
      log('fetching variant: safari')
      jsImport = import(
        /* webpackChunkName: "safari-dev" */
        'blitpunk-dev-safari.js'
      )
      break
    default:
      log('fetching variant: legacy')
      jsImport = import(
        /* webpackChunkName: "legacy-dev" */
        'blitpunk-dev-legacy.js'
      )
  }
  return jsImport
}
