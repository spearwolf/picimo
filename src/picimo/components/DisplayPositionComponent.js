import { UNIFORM_RESOLUTION } from 'picimo/ce/constants'
import { getString, getUnitValue } from 'picimo/utils'
// import { debug } from 'common/log'

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
  // displayPosition.pivotX = getNumber(data.pivotX, 0.5)
  // displayPosition.pivotY = getNumber(data.pivotY, 0.5)
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
  }

  update (data) {
    updateAttributes(this, data)
  }

  connectedEntity (entity) {
    entity.on('transformPicture', this)
  }

  disconnectedEntity (entity) {
    entity.off(this)
  }

  transformPicture (renderer, textureDimension, transform) {
    transform(this.calcTransform(renderer, textureDimension))
  }

  calcTransform (renderer, { width: textureWidth, height: textureHeight }) {
    const [viewWidth, viewHeight] = getViewSize(renderer)
    const devicePixelRatio = renderer.shaderContext.curUniform(UNIFORM_RESOLUTION).value[2]

    if (this.needsUpdate ||
      viewWidth !== this.lastViewWidth || viewHeight !== this.lastViewHeight ||
      textureWidth !== this.lastTextureWidth || textureHeight !== this.lastTextureHeight ||
      devicePixelRatio !== this.lastDevicePixelRatio
    ) {
      this.needsUpdate = false
      this.lastViewWidth = viewWidth
      this.lastViewHeight = viewHeight
      this.lastTextureWidth = textureWidth
      this.lastTextureHeight = textureHeight
      this.lastDevicePixelRatio = devicePixelRatio

      const units = {
        vw: viewWidth,
        vh: viewHeight,
        sw: textureWidth,
        sh: textureHeight
      }

      let targetWidth = 0
      let targetHeight = 0

      let containerWidth = 0
      let containerHeight = 0

      let centerX = 0
      let centerY = 0

      // let { pivotX, pivotY } = this

      const { top, left, right, bottom } = this
      const { width, height } = this

      const hasTop = top !== null
      const hasRight = right !== null
      const hasBottom = bottom !== null
      const hasLeft = left !== null

      if (hasLeft && hasRight) {
        const leftPx = convertUnit(left, units, viewWidth, devicePixelRatio)
        const rightPx = convertUnit(right, units, viewWidth, devicePixelRatio)

        centerX = (leftPx - rightPx) / 2.0
        containerWidth = viewWidth - leftPx - rightPx
      }

      if (hasTop && hasBottom) {
        const topPx = convertUnit(top, units, viewHeight, devicePixelRatio)
        const bottomPx = convertUnit(bottom, units, viewHeight, devicePixelRatio)

        centerY = (bottomPx - topPx) / 2.0
        containerHeight = viewHeight - topPx - bottomPx
      }

      const hasWidth = width !== null
      const hasHeight = height !== null

      if (hasWidth || hasHeight) {
        if (hasWidth) {
          if (hasHeight) {
            // ======= width & height ==========================
            //
            containerWidth = convertUnit(width, units, textureWidth, devicePixelRatio)
            containerHeight = convertUnit(height, units, textureHeight, devicePixelRatio)
          } else {
            // ======= width ==========================
            //
            containerWidth = convertUnit(width, units, textureWidth, devicePixelRatio)
            if (containerHeight === 0) {
              containerHeight = containerWidth * (textureWidth / textureHeight)
            }
          }
        } else {
          // ======= height ==========================
          //
          containerHeight = convertUnit(height, units, textureHeight, devicePixelRatio)
          if (containerWidth === 0) {
            containerWidth = containerHeight * (textureHeight / textureWidth)
          }
        }
      }

      if (containerWidth === 0) containerWidth = viewWidth
      if (containerHeight === 0) containerHeight = viewHeight

      if (OBJECT_FIT_FILL === this.objectFit) {
        // ======= objectFit: fill ==========================
        //
        targetWidth = containerWidth
        targetHeight = containerHeight
      } else {
        // ======= objectFit: cover || contain ==========================
        //
        const containerRatio = containerHeight / containerWidth
        const srcRatio = textureHeight / textureWidth

        if (srcRatio === 1) {
          if (OBJECT_FIT_COVER === this.objectFit) {
            targetHeight = targetWidth = containerRatio > 1 ? containerHeight : containerWidth
          } else { // 'contain'
            targetHeight = targetWidth = containerRatio < 1 ? containerHeight : containerWidth
          }
        } else {
          let scale

          if (OBJECT_FIT_COVER === this.objectFit) {
            scale = srcRatio > containerRatio ? containerWidth / textureWidth : containerHeight / textureHeight
          } else { // "contain"
            scale = srcRatio < containerRatio ? containerWidth / textureWidth : containerHeight / textureHeight
          }

          targetWidth = scale * textureWidth
          targetHeight = scale * textureHeight
        }
      }

      if (hasBottom) {
        const bottomPx = convertUnit(bottom, units, viewHeight, devicePixelRatio)

        centerY = -(viewHeight * 0.5) + bottomPx + (targetHeight * 0.5)
      } else if (hasTop) {
        const topPx = convertUnit(top, units, viewHeight, devicePixelRatio)

        centerY = (viewHeight * 0.5) - topPx - (targetHeight * 0.5)
      }

      if (hasLeft) {
        const leftPx = convertUnit(left, units, viewWidth, devicePixelRatio)

        centerX = -(viewWidth * 0.5) + leftPx + (targetWidth * 0.5)
      } else if (hasRight) {
        const rightPx = convertUnit(right, units, viewWidth, devicePixelRatio)

        centerX = (viewWidth * 0.5) - rightPx - (targetWidth * 0.5)
      }

      this.targetTransform = {
        width: targetWidth,
        height: targetHeight,
        x: centerX,
        y: centerY,
        z: 0  // TODO picture: z-value
      }

      // debug(`[${DISPLAY_POSITION}] calcTransform`, this.targetTransform)
    }

    return this.targetTransform
  }
}
