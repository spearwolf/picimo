// https://www.bram.us/2016/10/31/checking-if-a-browser-supports-es6/
const supportsES6 = () => {
  try {
    eval('(a = 0) => a') // eslint-disable-line 
    return true
  } catch (err) {
    return false
  }
}

export default () => {
  return supportsES6() ? 'modern' : 'legacy'
}
