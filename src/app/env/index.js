/* global WorkerNavigator */

const hasWindow = typeof window !== 'undefined'
const hasDocument = typeof document !== 'undefined'
const hasConsole = typeof console !== 'undefined'

export default class Env {
  constructor () {
    this.hasWindow = hasWindow
    this.hasDocument = hasDocument
    this.hasConsole = hasConsole

    // http://stackoverflow.com/questions/7507638/is-there-a-standard-mechanism-for-detecting-if-a-javascript-is-executing-as-a-we
    this.isNode = typeof global !== 'undefined' && Object.prototype.toString.call(global) === '[object global]'
    this.isWebWorker = !this.isNode && typeof WorkerGlobalScope !== 'undefined' && typeof importScripts === 'function' && navigator instanceof WorkerNavigator
    this.isBrowser = !this.isNode && !this.isWebWorker && typeof navigator !== 'undefined' && hasDocument

    switch (detectWebGl()) {
      case 'webgl2':
        this.hasWebGL2 = true
        this.hasWebGL = true
        break
      case 'webgl':
        this.hasWebGL2 = false
        this.hasWebGL = true
        break
      default:
        this.hasWebGL2 = false
        this.hasWebGL = false
    }

    Object.freeze(this)
  }
}

function detectWebGl () {
  if (!hasDocument) return

  const canvas = document.createElement('canvas')

  if (getContext(canvas, 'webgl2') || getContext(canvas, 'experimental-webgl2')) {
    return 'webgl2'
  }

  if (getContext(canvas, 'webgl') || getContext(canvas, 'experimental-webgl')) {
    return 'webgl'
  }
}

function getContext (canvas, ctx, options) {
  try {
    return canvas.getContext(ctx, options)
  } catch (err) {
    if (hasConsole) {
      console.log(`canvas.getContext(${ctx}) trouble!`, err)
    }
  }
}
