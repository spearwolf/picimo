/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai'

import initializePicimo from 'picimo'

import lookout from './lookout'

const bContainer = document.querySelector('.picimo')

describe('<pi-picture>', () => {
  before(initializePicimo)

  describe('object-fit: contain', () => {
    let picture

    before(() => {
      bContainer.innerHTML = `
        <pi-texture-atlas id="atlas0" src="/assets/nobinger.json" nearest></pi-texture-atlas>
        <pi-canvas alpha premultiplied-alpha
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
      picture = bContainer.querySelector('pi-picture')
    })

    after(() => {
      // bContainer.innerHTML = ''
    })

    it('.entity exists', () => {
      expect(picture).to.have.property('entity')
    })

    it('all sprites created', done => {
      lookout(() => picture && picture.sprites && picture.sprites.length)
        .then(() => {
          expect(picture.sprites).to.exist
          expect(picture.sprites).to.have.lengthOf(16 * 16)
          done()
        })
    })
  })
})
