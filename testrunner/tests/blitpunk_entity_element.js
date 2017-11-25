/* eslint-env mocha */
import { assert } from 'chai'

import initializeBlitpunk from 'blitpunk'
import {
  ComponentFactory,
  ComponentRegistry,
  EntityManager
} from 'blitpunk/ecs'

const bContainer = document.querySelector('.blitpunk')

describe('<blitpunk-entity>', () => {
  before(initializeBlitpunk)

  describe('append new <blitpunk-entity> element to html', () => {
    let el

    beforeEach(() => {
      el = document.createElement('blitpunk-entity')
      el.componentRegistry = new ComponentRegistry()
      el.entityManager = new EntityManager()
      bContainer.appendChild(el)

      el.componentRegistry.registerComponent(
        'foo',
        ComponentFactory.createComponent(class {
          constructor (entity, foo) {
            this.value = parseInt(foo, 10)
            console.log('[foo] created', entity, foo, this)
          }

          update (foo) {
            this.value = parseInt(foo, 10)
            console.log('[foo] updated', foo, this)
          }

          connectedEntity (entity) {
            console.log('[foo] connected', entity, this)
          }

          disconnectedEntity (entity) {
            console.log('[foo] disconnected', entity, this)
          }
        }))
    })

    afterEach(() => {
      if (el) {
        bContainer.removeChild(el)
      }
    })

    it('create, update and remove foo= attribute (component)', () => {
      el.setAttribute('foo', 123)
      el.updateEntity()
      assert.equal(el.entity.foo.value, 123)

      const { foo } = el.entity
      el.setAttribute('foo', 456)
      el.updateEntity()
      assert.equal(el.entity.foo.value, 456)
      assert.equal(foo, el.entity.foo)

      el.removeAttribute('foo')
      el.updateEntity()
      assert.isNotOk(el.entity.foo)
    })
  })
})
