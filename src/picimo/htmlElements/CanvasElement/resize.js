
/**
 * Resize the canvas element to the same size as the `<pi-canvas>.parentNode`
 */
export default (el) => {
  const style = window.getComputedStyle(el, null)
  const { clientWidth: wPx, clientHeight: hPx } = style.display === 'inline' ? el.parentNode : el
  const { canvas } = el
  const dpr = window.devicePixelRatio || 1

  canvas.style.width = wPx + 'px'
  canvas.style.height = hPx + 'px'

  const w = Math.round(wPx * dpr)
  const h = Math.round(hPx * dpr)

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
  }
}
