
export default (javascriptVariant) => {
  let jsImport
  switch (javascriptVariant) {
    case 'modern':
      jsImport = import(
        /* webpackChunkName: "modern" */
        'picimo-modern.js'
      )
      break
    case 'safari':
      jsImport = import(
        /* webpackChunkName: "safari" */
        'picimo-safari.js'
      )
      break
    default:
      jsImport = import(
        /* webpackChunkName: "legacy" */
        'picimo-legacy.js'
      )
  }
  return jsImport
}
