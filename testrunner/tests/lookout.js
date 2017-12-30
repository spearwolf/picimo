const TIMEOUT_MS = 4800
const WAIT_MS = 16

export default (expressionCallback, timeoutMs = TIMEOUT_MS, waitMs = WAIT_MS) => new Promise((resolve, reject) => {
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
