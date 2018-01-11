/* eslint-env browser */
/* global PICIMO */

const INITIAL_AMOUNT = 20
const GRAVITY = 0.5

PICIMO.registerComponent('benchy',
  class {
    static preConditionAttributes () {
      return [ 'textureAtlas', 'spriteGroup' ]
    }

    // TODO static defaultProps ()

    create () {
      this.sprites = []
    }

    setCreateMode (mode = 'none') {
      this.createMode = mode
    }

    renderFrame (renderer) {
      const { width, height } = renderer.context.get('projection')
      this.viewHalfWidth = width * 0.5
      this.viewHalfHeight = height * 0.5

      if (this.sprites.length === 0 || this.createMode === 'create') {
        this.createSprites()
      }

      this.animateSprites()
    }

    createSprites (frameName) {
      const { spriteGroup, textureAtlas } = this
      const { availableCount } = spriteGroup

      let amount = this.nextCreateSpritesAmount()
      if (amount > availableCount) amount = availableCount
      if (amount === 0) return

      const viewHalfWidth = this.viewHalfWidth || 0
      const viewHalfHeight = this.viewHalfHeight || 0

      for (let i = 0; i < amount; i++) {
        const frame = frameName ? textureAtlas.getFrame(frameName) : textureAtlas.getRandomFrame()
        const sprite = spriteGroup.createSprite(frame)

        sprite.setTranslate(
          Math.random() * viewHalfWidth,
          Math.random() * viewHalfHeight
        )

        sprite.speedX = Math.random() * 8
        sprite.speedY = (Math.random() * 8) - 4

        sprite.rotateDegree = (Math.random() * 90) - 45
        sprite.speedRotate = (0.1 + (Math.random() * 4)) * (Math.random() > 0.5 ? 1 : -1)

        this.sprites.push(sprite)
      }

      this.entity.emit('benchySpriteCount', this.sprites.length)
    }

    animateSprites () {
      const gravity = -Math.abs(PICIMO.utils.getNumber(this.gravity, GRAVITY))
      const { sprites, viewHalfWidth, viewHalfHeight } = this
      const spritesCount = sprites.length

      for (let i = 0; i < spritesCount; i++) {
        const sprite = sprites[i]

        sprite.rotateDegree += sprite.speedRotate

        sprite.tx += sprite.speedX
        sprite.ty += sprite.speedY
        sprite.speedY += gravity

        if (sprite.tx > viewHalfWidth) {
          sprite.speedX = -Math.abs(sprite.speedX)
          sprite.tx = viewHalfWidth
        } else if (sprite.tx < -viewHalfWidth) {
          sprite.speedX = Math.abs(sprite.speedX)
          sprite.tx = -viewHalfWidth
        }

        if (sprite.ty > viewHalfHeight) {
          sprite.speedY = -0.85
          sprite.ty = viewHalfHeight
          if (Math.random() > 0.5) {
            sprite.speedY -= Math.random() * 6
          }
        } else if (sprite.ty < -viewHalfHeight) {
          sprite.speedY = Math.random() * 25
          sprite.ty = -viewHalfHeight
        }
      }
    }

    nextCreateSpritesAmount () {
      const total = this.sprites.length
      return total ? (total < 1500 ? 5 : 50) : (this.initialAmount || INITIAL_AMOUNT)
    }
  }
)
