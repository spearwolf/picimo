import 'src/blitpunk.js'
// import BlendMode from 'src/core/blend_mode'

function init (el, spriteGroup, atlas) {
  // el.renderer.setInitialBlendMode(new BlendMode(true, 'SRC_ALPHA', 'ONE_MINUS_SRC_ALPHA'))

  const sprite = spriteGroup.createSprite(atlas.getRandomFrame())
  sprite.setTranslate(190, 25)

  const nextRandomTexture = () => {
    const tex = atlas.getRandomFrame()
    sprite.setTexCoordsByTexture(tex)
    sprite.setSize(tex.width, tex.height)
  }

  document.body.addEventListener('click', nextRandomTexture)
  document.body.addEventListener('touchstart', nextRandomTexture)

  spriteGroup.createSprite(atlas.getRandomFrame()).setTranslate(-200, -25)

  el.on('debug', () => {
    console.dir(spriteGroup.getTextureAtlas('tex'))
  })
}

Promise.all([
  document.getElementById('blitpunk'),
  document.getElementById('cloudsSprites').spriteGroupPromise,
  document.getElementById('cloudsAtlas').textureAtlasPromise
]).then((args) => init(...args))
