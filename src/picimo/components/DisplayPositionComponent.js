import { UNIFORM_RESOLUTION } from 'picimo/htmlElements/constants'
import { getNumber, getString, getUnitValue } from 'picimo/utils'
import { debug } from 'common/log'

export const DISPLAY_POSITION = 'display-position'

const OBJECT_FIT_FILL = 'fill'
const OBJECT_FIT_COVER = 'cover'

const DEFAULT_UNIT = 'px'
const DEFAULT_OBJECT_FIT = OBJECT_FIT_FILL

const updateAttributes = (displayPosition, data) => {
  if (!data) return

  displayPosition.top = getUnitValue(data.top, DEFAULT_UNIT)
  displayPosition.left = getUnitValue(data.left, DEFAULT_UNIT)
  displayPosition.right = getUnitValue(data.right, DEFAULT_UNIT)
  displayPosition.bottom = getUnitValue(data.bottom, DEFAULT_UNIT)
  displayPosition.pivotX = getNumber(data.pivotX, 0.5)
  displayPosition.pivotY = getNumber(data.pivotY, 0.5)
  displayPosition.width = getUnitValue(data.width, DEFAULT_UNIT)
  displayPosition.height = getUnitValue(data.height, DEFAULT_UNIT)
  displayPosition.objectFit = getString(data.objectFit, DEFAULT_OBJECT_FIT)

  displayPosition.needsUpdate = true
}

const getViewSize = webGlRenderer => {
  const projectionOrViewport = webGlRenderer.context.get('projection') || webGlRenderer.viewport
  return [projectionOrViewport.width, projectionOrViewport.height]
}

const convertUnit = ({ unit, value }, units, percent, devicePixelRatio) => {
  switch (unit) {
    case '%':
      return value * (percent / 100.0)

    case 'dpx':
      return value / devicePixelRatio // TODO integrate current projection into dpx-calculation

    case 'px':
      return value

    default:
      return value * (units[unit] / 100.0)
  }
}

export default class DisplayPosition {
  constructor (entity, data) {
    updateAttributes(this, data)
    debug(`[${DISPLAY_POSITION}] create`, this, data)
  }

  update (data) {
    updateAttributes(this, data)
    debug(`[${DISPLAY_POSITION}] udpate`, this)
  }

  calculate (renderer, { width: srcWidth, height: srcHeight }) {
    const [viewWidth, viewHeight] = getViewSize(renderer)

    if (this.needsUpdate || viewWidth !== this.lastViewWidth || viewHeight !== this.lastViewHeight || srcWidth !== this.lastSrcWidth || srcHeight !== this.lastSrcHeight) {
      this.needsUpdate = false
      this.lastViewWidth = viewWidth
      this.lastViewHeight = viewHeight
      this.lastSrcWidth = srcWidth
      this.lastSrcHeight = srcHeight

      const dpr = renderer.shaderContext.curUniform(UNIFORM_RESOLUTION).value[2]
      const units = {
        vw: viewWidth,
        vh: viewHeight,
        sw: srcWidth,
        sh: srcHeight
      }

      let targetWidth
      let targetHeight

      let containerWidth
      let containerHeight

      let translateX = 0
      let translateY = 0

      let { pivotX, pivotY } = this

      const { top, left, right, bottom } = this
      const { width, height } = this

      if (width || height) {
        if (width) {
          if (height) {
            // ======= width & height ==========================
            //
            targetWidth = convertUnit(width, units, srcWidth, dpr)
            targetHeight = convertUnit(height, units, srcHeight, dpr)
          } else {
            // ======= width ==========================
            //
            targetWidth = convertUnit(width, units, srcWidth, dpr)
            targetHeight = targetWidth * (srcWidth / srcHeight)
          }
        } else {
          // ======= height ==========================
          //
          targetHeight = convertUnit(height, units, srcHeight, dpr)
          targetWidth = targetHeight * (srcHeight / srcWidth)
        }

        containerWidth = targetWidth
        containerHeight = targetHeight
      }

      if (top && bottom) {
        const topPx = convertUnit(top, units, viewHeight, dpr)
        const bottomPx = convertUnit(bottom, units, viewHeight, dpr)
        const halfViewHeight = viewHeight * 0.5
        translateY = halfViewHeight - topPx
        containerHeight = translateY - ((-halfViewHeight) + bottomPx)
        pivotY = 1
        if (!containerWidth && !(left && right)) {
          containerWidth = containerHeight * srcWidth / srcHeight
        }
      } else if (!containerHeight) {
        containerHeight = viewHeight
      }

      if (left && right) {
        const leftPx = convertUnit(left, units, viewWidth, dpr)
        const rightPx = convertUnit(right, units, viewWidth, dpr)
        const halfViewWidth = viewWidth * 0.5
        translateX = -halfViewWidth + leftPx
        containerWidth = halfViewWidth - rightPx - translateX
        pivotX = 0
        if (!containerHeight && !(top && bottom)) {
          containerHeight = containerWidth * srcHeight / srcWidth
        }
      } else if (!containerWidth) {
        containerWidth = viewWidth
      }

      if (bottom && !top) {
        translateY = -(viewHeight * 0.5) + convertUnit(bottom, units, viewHeight, dpr)
      }

      if (top && !bottom) {
        translateY = (viewHeight * 0.5) - convertUnit(top, units, viewHeight, dpr)
      }

      if (right && !left) {
        translateX = (viewWidth * 0.5) - convertUnit(right, units, viewWidth, dpr)
      }

      if (left && !right) {
        translateX = -(viewWidth * 0.5) + convertUnit(left, units, viewWidth, dpr)
      }

      if (OBJECT_FIT_FILL === this.objectFit) {
        // ======= objectFit: fill ==========================
        //
        targetWidth = containerWidth
        targetHeight = containerHeight
      } else {
        // ======= objectFit: cover || contain ==========================
        //
        const containerRatio = containerHeight / containerWidth
        const srcRatio = srcHeight / srcWidth

        if (srcRatio === 1) {
          if (OBJECT_FIT_COVER === this.objectFit) {
            targetHeight = targetWidth = containerRatio > 1 ? containerHeight : containerWidth
          } else { // 'contain'
            targetHeight = targetWidth = containerRatio < 1 ? containerHeight : containerWidth
          }
        } else {
          let scale

          if (OBJECT_FIT_COVER === this.objectFit) {
            scale = srcRatio > containerRatio ? containerWidth / srcWidth : containerHeight / srcHeight
          } else { // "contain"
            scale = srcRatio < containerRatio ? containerWidth / srcWidth : containerHeight / srcHeight
          }

          targetWidth = scale * srcWidth
          targetHeight = scale * srcHeight
        }
      }

      this.targetTransform = {
        width: targetWidth,
        height: targetHeight,
        x: translateX - (targetWidth * pivotX) + (targetWidth * 0.5),
        y: translateY - (targetHeight * pivotY) + (targetHeight * 0.5)
        // TODO z?
      }

      debug(`[${DISPLAY_POSITION}] calculate`, this.targetTransform)
    }

    return this.targetTransform
  }
}
