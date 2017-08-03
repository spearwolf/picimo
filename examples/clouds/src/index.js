import 'src/blitpunk.js'
import randomCloudFrame from './randomCloudFrame.js'
import shuffle from 'lodash/shuffle'

const LOGO_URL = 'spw-mini-logo.png'

const CLOUD_SPEED = 40
const CLOUD_Z_START = -200
const CLOUD_Z_MAX = 100
const CLOUD_Z_RANGE = CLOUD_Z_MAX - CLOUD_Z_START
const CLOUD_FADEIN_MARGIN = 0.2 * CLOUD_Z_RANGE
const CLOUD_FADEOUT_MARGIN = 0.05 * CLOUD_Z_RANGE

const MAX_CLOUDS = 50
const clouds = []

function makeCloud (sprite, atlas) {
  const texture = randomCloudFrame(atlas)
  sprite.setSize(texture.width, texture.height)
  sprite.setTexCoordsByTexture(texture)
  sprite.setTranslate((Math.random() * 800) - 400, -(sprite.height / 2) + (Math.random() * 100) - 50)
}

function fadeByOpacity (cloud) {
  const { z } = cloud
  if (z < CLOUD_Z_START) {
    cloud.opacity = 0
  } else if (z < CLOUD_Z_START + CLOUD_FADEIN_MARGIN) {
    cloud.opacity = (z - CLOUD_Z_START) / CLOUD_FADEIN_MARGIN
  } else if (z < CLOUD_Z_MAX - CLOUD_FADEOUT_MARGIN) {
    cloud.opacity = 1
  } else if (z < CLOUD_Z_MAX) {
    cloud.opacity = (CLOUD_Z_MAX - z) / CLOUD_FADEOUT_MARGIN
  } else {
    clouds.opacity = 0
  }
}

function createClouds (spriteGroup, atlas) {
  let zValues = []
  for (let i = 0; i < MAX_CLOUDS; ++i) {
    const sprite = spriteGroup.createSprite()
    makeCloud(sprite, atlas)
    zValues.push(CLOUD_Z_START - (i * (CLOUD_Z_RANGE / MAX_CLOUDS)))
    clouds.push(sprite)
  }
  shuffle(zValues).forEach((z, i) => {
    clouds[i].z = z
  })
}

function createLogo (spriteGroup, atlas) {
  const logo = spriteGroup.createSprite(atlas.getFrame(LOGO_URL))
  logo.setSize(76, 12)
  logo.setTranslate(0, 300 - 20)
  logo.scale = 2
}

function animateClouds (app, atlas) {
  clouds.forEach((sprite) => {
    sprite.z += app.timeFrameOffset * CLOUD_SPEED
    if (sprite.z > CLOUD_Z_MAX) {
      makeCloud(sprite, atlas)
      sprite.z -= CLOUD_Z_RANGE
    }
    fadeByOpacity(sprite)
  })
}

function init (el, spriteGroup, atlas) {
  createLogo(spriteGroup, atlas)
  createClouds(spriteGroup, atlas)

  el.on('animateFrame', (app) => animateClouds(app, atlas))
}

Promise.all([
  document.getElementById('blitpunk'),
  document.getElementById('cloudsSprites').spriteGroupPromise,
  document.getElementById('cloudsAtlas').textureAtlasPromise
]).then((args) => init(...args))
