import 'src/blitpunk'

import SpriteGroup from 'src/core/sprite_group'

const el = document.getElementById('blitpunkCanvas')

// const a = el.entityManager.createEntity()
// const b = el.entityManager.createEntity()
// const c = el.entityManager.createEntity()
//
// el.componentRegistry.createComponent(a, 'children')
//
// el.scene.children.appendChild(a)
// el.scene.children.appendChild(b)
// a.children.appendChild(c)
//
// a.on('debug', () => console.log('a'))
// b.on('debug', () => console.log('b'))
// c.on('debug', () => {
  // console.log('c')
  // a.children.removeChild(c)
// })

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

// spriteGroup
  // .loadTextureAtlas('tex', 'comic-font.json')
  // .then((atlas) => {
const atlasEl = document.querySelector('#atlas1')
spriteGroup.setTextureAtlas('tex', atlasEl.textureId)

atlasEl.textureAtlasPromise.then((atlas) => {
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

el.on('renderFrame', (renderer) => {
  spriteGroup.renderFrame(renderer)
})

el.on('debug', () => {
  console.dir(spriteGroup)
  console.dir(spriteGroup.getTextureAtlas('tex'))
})
