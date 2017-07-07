import 'src/blitpunk'

import Mat4 from 'src/utils/mat4'
import ResourceLibrary from 'src/core/resource_library'
import ShaderUniformVariable from 'src/core/shader_uniform_variable'
import SpriteGroup from 'src/core/sprite_group'
import TextureLibrary from 'src/core/texture_library'

const spriteGroup = new SpriteGroup(new ResourceLibrary(), new TextureLibrary(), {
  descriptor: 'simple',
  capacity: 100,
  vertexShader: 'simple',
  fragmentShader: 'simple',
  primitive: 'TRIANGLES',
  voNew: (vo) => {
    vo.scale = 1 / 900.0
    vo.opacity = 1
  }
})

console.dir(spriteGroup)

spriteGroup
  .loadTextureAtlas('tex', 'comic-font.json')
  .then((atlas) => {
    console.dir(atlas)

    const sprite = spriteGroup.createSprite(atlas.getRandomFrame())
    sprite.setTranslate(0.25, 0.25)

    const nextRandomTexture = () => {
      const tex = atlas.getRandomFrame()
      sprite.setTexCoordsByTexture(tex)
      sprite.setSize(tex.width, tex.height)
    }

    document.body.addEventListener('click', nextRandomTexture)
    document.body.addEventListener('touchstart', nextRandomTexture)

    spriteGroup.createSprite(atlas.getFrame('R')).setTranslate(-0.2, -0.2)
  })

const viewMatrixUniform = new ShaderUniformVariable('viewMatrix', new Mat4())  // TODO set viewMatrix by <scene .. viewport />

const el = document.getElementById('blitpunkCanvas')

el.on('renderFrame', (renderer) => {
  renderer.shaderContext.pushVar(viewMatrixUniform)
  spriteGroup.renderFrame(renderer)
})
