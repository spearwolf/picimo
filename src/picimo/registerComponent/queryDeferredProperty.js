/* eslint-env browser */

export default (propertyName, selector, component, key, verifyCreated) => {
  const el = document.querySelector(selector)
  if (el) {
    const { entity } = el
    if (entity) {
      entity.emit(`selectDeferred:${propertyName}`, propertyValue => {
        Promise.resolve(propertyValue).then(value => {
          component[key] = value
          verifyCreated()
        })
      })
    }
  }
}
