import { isFunction } from 'picimo/utils'

export default (component, name, defaultValue) => {
  const value = component[name]
  if (value != null) {
    return isFunction(value) ? value() : value
  }
  return isFunction(defaultValue) ? defaultValue() : defaultValue
}
