import camelCase from 'lodash/camelCase'

const TIMEOUT_QUERY_REPEAT_INTERVAL = 64
const TIMEOUT_MAX_WAIT_FOR_ENTITY = 8192
const TIMEOUT_DEFER_COMPONENT_CONNECTED = 1

const queryElement = el => Promise.resolve(typeof el === 'string' ? document.querySelector(el) : (typeof el === 'function' ? el() : el))
const queryEntity = el => el && el.entity

const afterComponentConnected = (entity, componentName) => new Promise(resolve => {
  entity.once(`componentConnected:${componentName}`, component => {
    setTimeout(() => resolve(component), TIMEOUT_DEFER_COMPONENT_CONNECTED)
  })
})

export default (el, componentName = null) => new Promise((resolve, reject) => {
  const start = window.performance.now()

  const getEntity = () => {
    const tryAgain = () => {
      if ((window.performance.now() - start) < TIMEOUT_MAX_WAIT_FOR_ENTITY) {
        setTimeout(getEntity, TIMEOUT_QUERY_REPEAT_INTERVAL)
      } else {
        reject(new Error(`queryEntity(${el}) timed out!`))
      }
    }

    queryElement(el).then(element => {
      const entity = queryEntity(element)
      if (entity) {
        if (componentName) {
          const componentNames = Array.isArray(componentName) ? componentName : [componentName]
          Promise.all(componentNames.map(cName => {
            const name = camelCase(cName)
            const component = entity[name]
            if (component) {
              return { name, component }
            }
            return afterComponentConnected(entity, name).then(component => ({ name, component }))
          })
          ).then(components => {
            const value = { el, entity }
            components.forEach(({ name, component }) => {
              value[name] = component
            })
            resolve(value)
          }, reject)
        } else {
          resolve({ el, entity })
        }
      } else {
        tryAgain()
      }
    }, reject)
  }
  getEntity()
})
