import randomCloudFrame from './randomCloudFrame.js'
import shuffle from 'lodash/shuffle'

const makeCloud = (blitpunk, sprite, atlas) => {
  const texture = randomCloudFrame(blitpunk, atlas)
  sprite.setSize(texture.width, texture.height)
  sprite.setTexCoordsByTexture(texture)
  sprite.setTranslate((Math.random() * 800) - 400, -(sprite.height / 2) + (Math.random() * 100) - 50)
}

const createClouds = (blitpunk, spriteGroup, atlas, clouds, maxClouds, zStart, zRange) => {
  let zValues = []
  for (let i = 0; i < maxClouds; ++i) {
    const sprite = spriteGroup.createSprite()
    makeCloud(blitpunk, sprite, atlas)
    zValues.push(zStart - (i * (zRange / maxClouds)))
    clouds.push(sprite)
  }
  shuffle(zValues).forEach((z, i) => {
    clouds[i].z = z
  })
  return clouds
}

const fadeByOpacity = (cloud, zStart, zMax, fadeInMargin, fadeOutMargin) => {
  const { z } = cloud
  if (z < zStart) {
    cloud.opacity = 0
  } else if (z < zStart + fadeInMargin) {
    cloud.opacity = (z - zStart) / fadeInMargin
  } else if (z < zMax - fadeOutMargin) {
    cloud.opacity = 1
  } else if (z < zMax) {
    cloud.opacity = (zMax - z) / fadeOutMargin
  } else {
    cloud.opacity = 0
  }
}

export default class Clouds {
  constructor (blitpunk, spriteGroup, atlas, options) {
    this.blitpunk = blitpunk
    this.spriteGroup = spriteGroup
    this.atlas = atlas
    Object.assign(this, {
      speed: 40,
      zStart: -200,
      zMax: 100,
      fadeInMarginFactor: 0.2,
      fadeOutMarginFactor: 0.05,
      maxClouds: 50
    }, options)
    this.clouds = createClouds(blitpunk, spriteGroup, atlas, [], this.maxClouds, this.zStart, this.zRange)
  }

  get zRange () {
    return this.zMax - this.zStart
  }

  get fadeInMargin () {
    return this.fadeInMarginFactor * this.zRange
  }

  get fadeOutMargin () {
    return this.fadeOutMarginFactor * this.zRange
  }

  animateFrame (app) {
    this.clouds.forEach((sprite) => {
      sprite.z += app.timeFrameOffset * this.speed
      if (sprite.z > this.zMax) {
        makeCloud(this.blitpunk, sprite, this.atlas)
        sprite.z -= this.zRange
      }
      fadeByOpacity(sprite, this.zStart, this.zMax, this.fadeInMargin, this.fadeOutMargin)
    })
  }
}
