/* global PICIMO_ENV */

const log = typeof console !== 'undefined' ? (
  typeof console.debug === 'function'
  ? (...args) => console.debug(...args)
  : (...args) => console.log(...args)
) : () => 1

const info = typeof console !== 'undefined' ? (...args) => console.log(...args) : () => 1

const error = typeof console !== 'undefined' ? (
  typeof console.error === 'function'
  ? (...args) => console.error(...args)
  : (...args) => console.log(...args)
) : () => 1

const debug = PICIMO_ENV === 'development' && typeof console !== 'undefined' ? (
  typeof console.debug === 'function'
  ? (...args) => console.debug(...args)
  : (...args) => console.log(...args)
) : () => 1

const logOnceOnly = (logMethod = info) => {
  let alreadyLogged = false
  return (...args) => {
    if (!alreadyLogged) {
      alreadyLogged = true
      logMethod(...args)
    }
  }
}

export default log
export {
  debug,
  error,
  info,

  logOnceOnly
}
