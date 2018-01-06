/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai'

import initializePicimo from 'picimo'

import { pictureMeshCreated, afterNextAF } from './utils/waitUntil'
import { createHtml, querySelector, matchScreenshot } from './utils/matchScreenshot'

describe('<pi-picture>', () => {
  before(initializePicimo)

  describe('object-fit: contain', () => {
    let piPictureEl

    before(() => {
      createHtml(`
        <pi-texture-atlas id="atlas0" src="/assets/nobinger.json" nearest></pi-texture-atlas>
        <pi-canvas alpha premultiplied-alpha preserve-drawing-buffer width="600" height="300"
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
      `)

      piPictureEl = querySelector('pi-picture')

      return pictureMeshCreated(piPictureEl).then(afterNextAF)
    })

    it('.entity exists', () => {
      expect(piPictureEl).to.have.property('entity')
    })

    it('all sprites created', () => {
      expect(piPictureEl.sprites).to.exist
      expect(piPictureEl.sprites).to.have.lengthOf(16 * 16)
    })

    it('screenshot match', () => matchScreenshot('picture-atlas-frame-contain.png'))
  })

  describe('object-fit: cover', () => {
    before(() => {
      createHtml(`
        <pi-texture-atlas id="atlas0" src="/assets/nobinger.json" nearest></pi-texture-atlas>
        <pi-canvas alpha premultiplied-alpha preserve-drawing-buffer width="600" height="300"
          clear="color: #fff"
          projection="sizeFit: contain; desiredWidth: 300; desiredHeight: 150"
          >
          <pi-picture
            mesh-rows="16"
            mesh-cols="16"
            texture="src: #atlas0; frame: nobinger-gruen.png"
            display-position="objectFit: cover"
          ></pi-picture>
        </pi-canvas>
      `)

      return pictureMeshCreated(querySelector('pi-picture')).then(afterNextAF)
    })

    it('screenshot match', () => matchScreenshot('picture-atlas-frame-cover.png'))
  })

  describe('top,left,bottom,right and fill', () => {
    before(() => {
      createHtml(`
        <pi-texture-atlas id="atlas0" src="/assets/picimo-atlas.json" nearest></pi-texture-atlas>
        <pi-canvas alpha premultiplied-alpha preserve-drawing-buffer width="600" height="300"
          clear="color: #fff"
          projection="sizeFit: contain; desiredWidth: 300; desiredHeight: 150"
          >
          <pi-picture
            mesh-rows="16"
            mesh-cols="16"
            texture="src: #atlas0; frame: picimo"
            display-position="top: 20%; bottom: 20%; left: 5%; right: 5%; objectFit: fill"
          ></pi-picture>
        </pi-canvas>
      `)

      return pictureMeshCreated(querySelector('pi-picture')).then(afterNextAF)
    })

    it('screenshot match', () => matchScreenshot('picture-top-left-bottom-right-fill.png'))
  })

  describe('top,left,bottom,right and contain', () => {
    before(() => {
      createHtml(`
        <pi-texture-atlas id="atlas0" src="/assets/picimo-atlas.json" nearest></pi-texture-atlas>
        <pi-canvas alpha premultiplied-alpha preserve-drawing-buffer width="600" height="300"
          clear="color: #fff"
          projection="sizeFit: contain; desiredWidth: 300; desiredHeight: 150"
          >
          <pi-picture
            mesh-rows="16"
            mesh-cols="16"
            texture="src: #atlas0; frame: picimo"
            display-position="top: 20%; bottom: 20%; left: 5%; right: 5%; objectFit: contain"
          ></pi-picture>
        </pi-canvas>
      `)

      return pictureMeshCreated(querySelector('pi-picture')).then(afterNextAF)
    })

    it('screenshot match', () => matchScreenshot('picture-top-left-bottom-right-contain.png'))
  })

  describe('top,left,bottom,right and cover', () => {
    before(() => {
      createHtml(`
        <pi-texture-atlas id="atlas0" src="/assets/picimo-atlas.json" nearest></pi-texture-atlas>
        <pi-canvas alpha premultiplied-alpha preserve-drawing-buffer width="600" height="300"
          clear="color: #fff"
          projection="sizeFit: contain; desiredWidth: 300; desiredHeight: 150"
          >
          <pi-picture
            mesh-rows="16"
            mesh-cols="16"
            texture="src: #atlas0; frame: picimo"
            display-position="top: 20%; bottom: 20%; left: 5%; right: 5%; objectFit: cover"
          ></pi-picture>
        </pi-canvas>
      `)

      return pictureMeshCreated(querySelector('pi-picture')).then(afterNextAF)
    })

    it('screenshot match', () => matchScreenshot('picture-top-left-bottom-right-cover.png'))
  })
})
