/* eslint-env mocha */
/* global BLITPUNK customElements */
import { assert } from 'chai'

import EntityElement from '../../src/dom/elements/EntityElement'

const bContainer = document.querySelector('.blitpunk')

describe('<blitpunk-entity>', () => {
  before(() => BLITPUNK.initialize().then(() => {
    customElements.define('blitpunk-entity', EntityElement)
  }))

  describe('after adding a new <blitpunk-entity> element to the dom', () => {
    let entity

    beforeEach(() => {
      entity = document.createElement('blitpunk-entity')
      bContainer.appendChild(entity)
    })

    afterEach(() => {
      if (entity) {
        // bContainer.removeChild(entity)
      }
    })

    it('should have .foo and .bar properties', () => {
      entity.setAttribute('foo', 123)
      entity.setAttribute('bar', 456)
      assert.equal(entity.getAttribute('foo'), '123')
      assert.equal(entity.getAttribute('bar'), '456')
    })
  })
})
