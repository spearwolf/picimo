import Clouds from './Clouds.js'

const LOGO_URL = 'spw-mini-logo.png'

function createLogo (spriteGroup, atlas) {
  const logo = spriteGroup.createSprite(atlas.getFrame(LOGO_URL))
  logo.setSize(76, 12)
  logo.setTranslate(0, 300 - 20)
  logo.scale = 2
}

function init (el, spriteGroup, atlas) {
  createLogo(spriteGroup, atlas)

  const clouds = new Clouds(spriteGroup, atlas)
  el.on('animateFrame', clouds)
}

Promise.all([
  document.getElementById('blitpunk'),
  document.getElementById('cloudsSprites').spriteGroupPromise,
  document.getElementById('cloudsAtlas').textureAtlasPromise
]).then((args) => init(...args))
