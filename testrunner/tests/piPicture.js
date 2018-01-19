/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai'

import initializePicimo from 'picimo'

import { pictureMeshCreated, afterNextAF } from './utils/waitUntil'
import { createHtml, querySelector, querySelectorAll, matchScreenshot } from './utils/matchScreenshot'

describe('<pi-picture>', () => {
  before(initializePicimo)

  describe('default display-position', () => {
    before(() => {
      createHtml(`
        <pi-texture-atlas id="atlas0" src="/assets/picimo-atlas.json" nearest></pi-texture-atlas>
        <pi-canvas alpha premultiplied-alpha preserve-drawing-buffer width="600" height="300"
          clear="color: #fff"
          projection="sizeFit: contain; desiredWidth: 300; desiredHeight: 150"
          >
          <pi-picture texture="src: #atlas0; frame: picimo" display-position="objectFit: fill"></pi-picture>
        </pi-canvas>
      `)

      return pictureMeshCreated(querySelector('pi-picture')).then(afterNextAF)
    })

    it('screenshot match', () => matchScreenshot('picture-display-position.png'))
  })

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
            display-position="top: 2px; bottom: 25%; left: 2px; right: 25%; objectFit: fill"
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
            display-position="top: 25%; bottom: 2px; left: 25%; right: 2px; objectFit: contain"
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
            display-position="top: 25%; bottom: 2px; left: 25%; right: 2px; objectFit: cover"
          ></pi-picture>
        </pi-canvas>
      `)

      return pictureMeshCreated(querySelector('pi-picture')).then(afterNextAF)
    })

    it('screenshot match', () => matchScreenshot('picture-top-left-bottom-right-cover.png'))
  })

  describe('top,left,bottom,right and width,height', () => {
    before(() => {
      createHtml(`
        <pi-texture-atlas id="atlas0" src="/assets/lab-walls-tiles.json" nearest></pi-texture-atlas>
        <pi-canvas alpha premultiplied-alpha preserve-drawing-buffer width="600" height="300"
          projection="sizeFit: contain; desiredWidth: 300; desiredHeight: 150"
          blend="sfactor: srcAlpha; dfactor: oneMinusSrcAlpha"
          clear="color: #444"
          >
          <pi-picture texture="src: #atlas0; frame: numbers32_01"
            display-position="top: 1px; left: 1px; width: 25vw; objectFit: fill"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: numbers32_02"
            display-position="top: 1px; right: 1px; width: 25vh; objectFit: fill"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: numbers32_03"
            display-position="bottom: 1px; right: 1px; height: 25vw; objectFit: fill"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: numbers32_04"
            display-position="bottom: 1px; left: 1px; height: 25vh; objectFit: fill"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: numbers32_05"
            display-position="top: 2px; height: 71px; objectFit: contain"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: numbers32_07"
            display-position="bottom: 2px; height: 71px; objectFit: contain"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: numbers32_08"
            display-position="left: 12.5%; width: 12.5vw; objectFit: cover"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: numbers32_06"
            display-position="right: 12.5%; width: 12.5vw; objectFit: cover"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: numbers32_09"
            display-position="left: 31.25%; width: 12.5vw; height: 12.5vh; objectFit: cover"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: numbers32_10"
            display-position="right: 31.25%; width: 12.5vw; height: 12.5vh; objectFit: cover"
          ></pi-picture>
        </pi-canvas>
      `)

      return pictureMeshCreated(querySelectorAll('pi-picture')).then(afterNextAF)
    })

    it('screenshot match', () => matchScreenshot('picture-top-left-bottom-right-width-height.png'))
  })

  describe('top,left,bottom,right and default sizes', () => {
    before(() => {
      createHtml(`
        <pi-texture-atlas id="atlas0" src="/assets/amigaballs.json" nearest></pi-texture-atlas>
        <pi-canvas alpha premultiplied-alpha preserve-drawing-buffer width="600" height="300"
          projection="sizeFit: contain; desiredWidth: 300; desiredHeight: 150"
          blend="sfactor: srcAlpha; dfactor: oneMinusSrcAlpha"
          clear="color: #444"
          >
          <pi-picture texture="src: #atlas0; frame: amigaball-dark"
            display-position="width: 400%"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: amigakugeln_2"
            display-position="left: 1px; width: 200%"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: amigakugeln_3"
            display-position="top: 1px"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: amigakugeln_5"
            display-position="right: 1px; height: 200%"
          ></pi-picture>
          <pi-picture texture="src: #atlas0; frame: amigakugeln_1"
            display-position="bottom: 1px; objectFit: cover"
          ></pi-picture>
        </pi-canvas>
      `)

      return pictureMeshCreated(querySelectorAll('pi-picture')).then(afterNextAF)
    })

    it('screenshot match', () => matchScreenshot('picture-top-left-bottom-right-default-sizes.png'))
  })
})
