/* global PICIMO_ENV */
const DEBUG = PICIMO_ENV === 'development'

const hasConsole = typeof console !== 'undefined'

const info = hasConsole ? (...args) => console.log(...args) : () => undefined

const error = hasConsole ? (
  typeof console.error === 'function'
  ? (...args) => console.error(...args)
  : (...args) => console.log(...args)
) : () => undefined

const logOnlyOnce = (logMethod = info) => {
  let alreadyLogged = false
  return (...args) => {
    if (!alreadyLogged) {
      alreadyLogged = true
      logMethod(...args)
    }
  }
}

let debug

if (DEBUG) {
  debug = hasConsole ? (
    typeof console.debug === 'function'
    ? (...args) => console.debug(...args)
    : (...args) => console.log(...args)
  ) : () => undefined
} else {
  debug = () => undefined
}

export default debug
export {
  DEBUG,
  hasConsole,
  debug,
  error,
  info,
  logOnlyOnce
}
