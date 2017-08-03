import 'src/blitpunk.js'
import randomCloudFrame from './randomCloudFrame.js'

const LOGO = 'spw-mini-logo.png'

function init (el, spriteGroup, atlas) {
  const spw = spriteGroup.createSprite(atlas.getFrame(LOGO))
  spw.setTranslate(-420, 370)
  spw.setSize(76 * 2, 12 * 2)

  const sprite = spriteGroup.createSprite(randomCloudFrame(atlas))
  sprite.setTranslate(190, 25)

  const nextRandomTexture = () => {
    const tex = randomCloudFrame(atlas)
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
