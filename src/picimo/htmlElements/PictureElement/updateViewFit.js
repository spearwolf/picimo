import { ATTR_VIEW_FIT } from '../constants'
import { VIEW_FIT_COVER, VIEW_FIT_FILL } from './constants'

export default (el, webGlRenderer) => {
  const projectionOrViewport = webGlRenderer.context.get('projection') || webGlRenderer.viewport
  const {
    width: viewWidth,
    height: viewHeight
  } = projectionOrViewport

  const viewFit = el.getAttribute(ATTR_VIEW_FIT) || VIEW_FIT_FILL

  if (el.viewFitNeedsUpdate || el.lastViewFit !== viewFit || el.lastViewWidth !== viewWidth || el.lastViewHeight !== viewHeight) {
    el.viewFitNeedsUpdate = false
    el.lastViewFit = viewFit
    el.lastViewWidth = viewWidth
    el.lastViewHeight = viewHeight

    let targetWidth
    let targetHeight

    if (VIEW_FIT_FILL === viewFit) {
      targetWidth = viewWidth
      targetHeight = viewHeight
    } else {
      const { width: texWidth, height: texHeight } = el.texture
      const viewRatio = viewHeight / viewWidth
      const texRatio = texHeight / texWidth

      if (texRatio === 1) {
        if (VIEW_FIT_COVER === viewFit) {
          targetHeight = targetWidth = viewRatio > 1 ? viewHeight : viewWidth
        } else { // 'contain'
          targetHeight = targetWidth = viewRatio < 1 ? viewHeight : viewWidth
        }
      } else {
        let scale

        if (VIEW_FIT_COVER === viewFit) {
          scale = texRatio > viewRatio ? viewWidth / texWidth : viewHeight / texHeight
        } else { // "contain"
          scale = texRatio < viewRatio ? viewWidth / texWidth : viewHeight / texHeight
        }

        targetWidth = scale * texWidth
        targetHeight = scale * texHeight
      }
    }

    el.scaleUniform.value = [targetWidth, targetHeight, 0, 0]
  }
}
