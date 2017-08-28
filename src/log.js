
const log = typeof console !== 'undefined' ? (
  typeof console.debug === 'function'
  ? (...args) => console.debug(...args)
  : (...args) => console.log(...args)
) : () => 1

export default log
