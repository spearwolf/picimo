import initialize, { log, registerComponent } from 'picimo'
initialize()

const logOnlyOnce = log.logOnlyOnce()

registerComponent('hello',
  class {
    static preConditionAttributes () {
      return [ 'atlas', 'sprites' ]
    }

    componentCreated () {
      const { atlas: a, sprites: s } = this
      s.createSprite(a.getFrame('numbers32_01')).setTranslate(-160, 0)
      s.createSprite(a.getFrame('numbers32_02')).setTranslate(-128, 0)
      s.createSprite(a.getFrame('numbers32_03')).setTranslate(-96, 0)
      s.createSprite(a.getFrame('numbers32_04')).setTranslate(-64, 0)
      s.createSprite(a.getFrame('numbers32_05')).setTranslate(-32, 0)
      s.createSprite(a.getFrame('numbers32_06')).setTranslate(32, 0)
      s.createSprite(a.getFrame('numbers32_07')).setTranslate(64, 0)
      s.createSprite(a.getFrame('numbers32_08')).setTranslate(96, 0)
      s.createSprite(a.getFrame('numbers32_09')).setTranslate(128, 0)
      s.createSprite(a.getFrame('numbers32_10')).setTranslate(160, 0)
    }

    renderFrame () {
      logOnlyOnce('[hello] renderFrame', this)
    }
  })
