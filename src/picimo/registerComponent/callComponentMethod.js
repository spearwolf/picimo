import { isFunction } from 'picimo/utils'

export default (component, methodName, ...args) => {
  const method = component[methodName]
  if (isFunction(method)) {
    method.apply(component, args)
  }
}
