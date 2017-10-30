
const log = typeof console !== 'undefined' ? (
  typeof console.debug === 'function'
  ? (...args) => console.debug(...args)
  : (...args) => console.log(...args)
) : () => 1

const error = typeof console !== 'undefined' ? (
  typeof console.error === 'function'
  ? (...args) => console.error(...args)
  : (...args) => console.log(...args)
) : () => 1

export default log
export {
  error
}
