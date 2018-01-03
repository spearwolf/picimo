/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai'

import initializePicimo from 'picimo'

// import waitUntil, { afterNextAF, wait } from './utils/waitUntil'
import waitUntil, { afterNextAF } from './utils/waitUntil'
import expectToMatchScreenshot from './utils/expectToMatchScreenshot'

const containerEl = document.querySelector('.picimo')

const hasSomeSprites = el => () => el.sprites && el.sprites.length

describe('<pi-piPictureEl>', () => {
  const visualRegressionsEl = document.querySelector('.visualRegressions__container')

  before(initializePicimo)

  describe('object-fit: contain', () => {
    let piCanvasEl
    let piPictureEl

    before(() => {
      containerEl.innerHTML = `
        <pi-texture-atlas id="atlas0" src="/assets/nobinger.json" nearest></pi-texture-atlas>
        <pi-canvas alpha premultiplied-alpha preserve-drawing-buffer
          clear="color: #fff"
          projection="sizeFit: contain; desiredWidth: 300; desiredHeight: 150"
          >
          <pi-picture
            mesh-rows="16"
            mesh-cols="16"
            texture="src: #atlas0; frame: nobinger-rot.png"
            display-position="objectFit: contain"
          ></pi-picture>
        </pi-canvas>
      `
      piCanvasEl = containerEl.querySelector('pi-canvas')
      piPictureEl = containerEl.querySelector('pi-picture')

      return waitUntil(hasSomeSprites(piPictureEl)).then(afterNextAF)
    })

    // after(wait(500))

    it('.entity exists', () => {
      expect(piPictureEl).to.have.property('entity')
    })

    it('all sprites created', () => {
      expect(piPictureEl.sprites).to.exist
      expect(piPictureEl.sprites).to.have.lengthOf(16 * 16)
    })

    it('screenshot match', () => {
      return expectToMatchScreenshot('/tests/screenshots/picture-atlas-frame-contain.png', piCanvasEl, visualRegressionsEl)
    })
  })

  describe('object-fit: cover', () => {
    let piCanvasEl
    let piPictureEl

    before(() => {
      containerEl.innerHTML = `
        <pi-texture-atlas id="atlas0" src="/assets/nobinger.json" nearest></pi-texture-atlas>
        <pi-canvas alpha premultiplied-alpha preserve-drawing-buffer
          clear="color: #fff"
          projection="sizeFit: contain; desiredWidth: 300; desiredHeight: 150"
          >
          <pi-picture
            mesh-rows="16"
            mesh-cols="16"
            texture="src: #atlas0; frame: nobinger-blau.png"
            display-position="objectFit: cover"
          ></pi-picture>
        </pi-canvas>
      `
      piCanvasEl = containerEl.querySelector('pi-canvas')
      piPictureEl = containerEl.querySelector('pi-picture')

      return waitUntil(hasSomeSprites(piPictureEl)).then(afterNextAF)
    })

    // after(wait(500))

    it('screenshot match', () => {
      return expectToMatchScreenshot('/tests/screenshots/picture-atlas-frame-cover.png', piCanvasEl, visualRegressionsEl)
    })
  })
})
