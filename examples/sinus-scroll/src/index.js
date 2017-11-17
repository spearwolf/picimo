/* global BLITPUNK */

const init = async (el) => {
  const spriteGroup = await document.getElementById('mySprites').spriteGroupPromise
  const atlas = await document.getElementById('atlas1').textureAtlasPromise

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

  el.on('debug', () => {
    console.dir(spriteGroup.getTextureAtlas('tex'))
  })
}

BLITPUNK.initialize().then(() => {
  init(document.querySelector('#blitpunk'))
})
