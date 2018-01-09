import { debug, DEBUG } from 'common/log'

/**
 * @private
 *
 * Resize the canvas element to the same size as the `<pi-canvas>.parentNode`
 */
export default (el) => {
  const style = window.getComputedStyle(el, null)
  const { clientWidth: wPx, clientHeight: hPx } = style.display === 'inline' ? el.parentNode : el
  const { canvas, fixedCanvasSize } = el

  canvas.style.width = wPx + 'px'
  canvas.style.height = hPx + 'px'

  let w, h, dpr

  if (fixedCanvasSize) {
    w = fixedCanvasSize[0]
    h = fixedCanvasSize[1]
    dpr = w / wPx
    el._devicePixelRatio = dpr
  } else {
    dpr = el.devicePixelRatio
    w = Math.round(wPx * dpr)
    h = Math.round(hPx * dpr)
  }

  if (DEBUG) {
    if (wPx > 0 && hPx > 0) {
      const msg = `<pi-canvas> wpx=${wPx} hPx=${hPx} w=${w} h=${h} dpr=${dpr}`
      if (el._lastResizeLogMessage !== msg) {
        el._lastResizeLogMessage = msg
        debug(msg)
      }
    }
  }

  if (w !== canvas.width || h !== canvas.height) {
    canvas.width = w
    canvas.height = h
  }

  if (w !== el.width || h !== el.height) {
    /**
     * Canvas size in _device_ pixels.
     * @type {number}
     */
    el.width = w
    /**
     * Canvas size in _device_ pixels.
     * @type {number}
     */
    el.height = h

    el.resolutionUniform.value = [w, h, dpr]
  }
}
