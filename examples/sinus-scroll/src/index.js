/* global PICIMO */

const init = async () => {
  const spriteGroup = await document.getElementById('mySprites').spriteGroupPromise
  const atlas = await document.getElementById('atlas1').resourcePromise

  console.log('spriteGroup=', spriteGroup, 'textureAtlas=', atlas)

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
}

PICIMO.initialize().then(init)
