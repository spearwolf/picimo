/* global PICIMO */
import Clouds from './Clouds.js'

// const LOGO_URL = 'spw-mini-logo.png'
//
// function createLogo (spriteGroup, atlas) {
  // const logo = spriteGroup.createSprite(atlas.getFrame(LOGO_URL))
  // logo.setSize(76, 12)
  // logo.setTranslate(0, 300 - 20)
  // logo.scale = 2
// }

async function init (el) {
  const spriteGroup = await el.spriteGroupPromise
  const atlas = await document.getElementById('cloudsAtlas').textureAtlasPromise

  // createLogo(spriteGroup, atlas)

  const clouds = new Clouds(spriteGroup, atlas)
  el.entity.on('renderFrame', clouds)
}

PICIMO.initialize().then(() => {
  init(document.querySelector('#cloudsSprites'))
})
