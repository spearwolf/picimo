import 'src/blitpunk'

import ResourceLibrary from 'src/core/resource_library'
import SpriteGroup from 'src/core/sprite_group'
import TextureLibrary from 'src/core/texture_library'
import Projection from 'src/core/projection'

const spriteGroup = new SpriteGroup(new ResourceLibrary(), new TextureLibrary(), {
  descriptor: 'simple',
  capacity: 100,
  vertexShader: 'simple',
  fragmentShader: 'simple',
  primitive: 'TRIANGLES',
  voNew: (vo) => {
    vo.scale = 1  // / 900.0
    vo.opacity = 1
  }
})

console.dir(spriteGroup)

spriteGroup
  .loadTextureAtlas('tex', 'comic-font.json')
  .then((atlas) => {
    console.dir(atlas)

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

const el = document.getElementById('blitpunkCanvas')

el.on('animateFrame', (canvas) => {
  projection.update(canvas.width, canvas.height)

  if (canvas.frameNo === 66) {
    console.log(projection)
  }
})

el.on('renderFrame', (renderer) => {
  renderer.shaderContext.pushVar(projection.uniform)
  spriteGroup.renderFrame(renderer)
})
