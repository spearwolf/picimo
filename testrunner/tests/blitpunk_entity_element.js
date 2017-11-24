/* eslint-env mocha */
/* global BLITPUNK customElements */
import { assert } from 'chai'

import EntityElement from 'blitpunk/dom/elements/EntityElement'
import { ComponentRegistry, EntityManager } from 'blitpunk/ecs'

const bContainer = document.querySelector('.blitpunk')

describe('<blitpunk-entity>', () => {
  before(() => BLITPUNK.initialize().then(() => {
    customElements.define('blitpunk-entity', EntityElement)
  }))

  describe('after adding a new <blitpunk-entity> element to the dom', () => {
    let el

    beforeEach(() => {
      el = document.createElement('blitpunk-entity')
      el.componentRegistry = new ComponentRegistry()
      el.entityManager = new EntityManager()
      bContainer.appendChild(el)

      el.componentRegistry.registerComponent('foo', {
        create (entity, data) {
          return data
        },

        update (component, data) {
          component.foo = data
        },

        destroy (/* component */) { }
      })
    })

    afterEach(() => {
      if (el) {
        // bContainer.removeChild(el)
      }
    })

    it('should have .foo and .bar properties', () => {
      el.setAttribute('foo', 123)
      el.setAttribute('bar', 456)
      assert.equal(el.getAttribute('foo'), '123')
      assert.equal(el.getAttribute('bar'), '456')
    })
  })
})
