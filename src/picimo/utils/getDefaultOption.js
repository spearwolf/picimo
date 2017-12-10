
export default (options, key, defaultValueFn) => {
  if (options && key in options) {
    return options[key]
  }
  return typeof defaultValueFn === 'function' ? defaultValueFn() : defaultValueFn
}
