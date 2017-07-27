import 'src/blitpunk'

import SpriteGroup from 'src/core/sprite_group'
import Projection from 'src/core/projection'

const el = document.getElementById('blitpunkCanvas')

const spriteGroup = new SpriteGroup(el.resourceLibrary, el.textureLibrary, {
  descriptor: 'simple',
  capacity: 100,
  vertexShader: 'simple',
  fragmentShader: 'simple',
  primitive: 'TRIANGLES',
  voNew: (vo) => {  // TODO set this as default for 'simple'
    vo.scale = 1  // / 900.0
    vo.opacity = 1
  }
})

spriteGroup
  .loadTextureAtlas('tex', 'comic-font.json')
  .then((atlas) => {
    const sprite = spriteGroup.createSprite(atlas.getRandomFrame())
    sprite.setTranslate(190, 25)

    const nextRandomTexture = () => {
      const tex = atlas.getRandomFrame()
      sprite.setTexCoordsByTexture(tex)
      sprite.setSize(tex.width, tex.height)
    }

    document.body.addEventListener('click', nextRandomTexture)
    document.body.addEventListener('touchstart', nextRandomTexture)

    spriteGroup.createSprite(atlas.getFrame('R')).setTranslate(-190, -25)
  })

const projection = new Projection({ sizeFit: 'contain', desiredWidth: 800, desiredHeight: 800 })

el.on('animateFrame', (canvas) => {
  projection.update(canvas.width, canvas.height)
})

el.on('renderFrame', (renderer) => {
  renderer.shaderContext.pushVar(projection.uniform)
  spriteGroup.renderFrame(renderer)
})

el.on('debug', () => {
  console.dir(spriteGroup)
  console.dir(spriteGroup.getTextureAtlas('tex'))
  console.dir(projection)
})
