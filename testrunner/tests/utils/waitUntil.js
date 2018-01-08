/* eslint-env browser */
const TIMEOUT_MS = 4800
const WAIT_MS = 16

export const waitUntil = (expressionCallback, timeoutMs = TIMEOUT_MS, waitMs = WAIT_MS) => new Promise((resolve, reject) => {
  const start = Date.now()
  const watch = () => {
    try {
      const res = expressionCallback()
      if (res) return resolve(res)
    } catch (err) {
      return reject(err)
    }
    if ((Date.now() - start) > timeoutMs) {
      reject(new Error(`timeout, >${timeoutMs / 1000} sec`))
    } else {
      setTimeout(watch, waitMs)
    }
  }
  watch()
})

export const waitFor = (eventizer, eventName, timeoutMs = TIMEOUT_MS) => new Promise((resolve, reject) => {
  console.log('WAIT FOR: eventizer=', eventizer)

  const timeout = setTimeout(() => {
    reject(new Error(`timeout, >${timeoutMs / 1000} sec`))
  }, timeoutMs)

  eventizer.once(eventName, (...args) => {
    clearTimeout(timeout)
    resolve(...args)
  })
})

export const afterNextAF = () => new Promise(resolve => {
  window.requestAnimationFrame(() => {
    setTimeout(resolve, 1)
  })
})

export const wait = (ms) => () => new Promise(resolve => {
  setTimeout(resolve, ms)
})

const PICTURE_MESH_CREATED = 'pictureMeshCreated'

export const pictureMeshCreated = el => {
  if (el instanceof NodeList) {
    return Promise.all(Array.from(el).map(elem => {
      return waitUntil(() => elem.entity).then(() => waitFor(elem.entity, PICTURE_MESH_CREATED))
    }))
  }
  return waitUntil(() => el.entity).then(() => waitFor(el.entity, PICTURE_MESH_CREATED))
}

export default waitUntil
