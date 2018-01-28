/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai'
import sinon from 'sinon'
import EntityManager from 'picimo/ecs/entity_manager'
import Entity from 'picimo/ecs/entity'

describe('EntityManager', () => {
  it('should be instanceable', () => {
    expect(new EntityManager()).to.be.ok
  })
  describe('.createEntity()', () => {
    it('should create an entity', () => {
      const manager = new EntityManager()
      expect(manager.createEntity()).to.be.instanceOf(Entity)
    })
  })
  describe('.getEntity()', () => {
    let manager
    before(() => {
      manager = new EntityManager()
    })
    it('should return the entity by id', () => {
      const entity = manager.createEntity()
      expect(manager.getEntity(entity.id)).to.equal(entity)
    })
    it('should return nothing when entity id is unknown', () => {
      expect(manager.getEntity('abc123')).to.be.undefined
      expect(manager.getEntity()).to.be.undefined
      expect(manager.getEntity(null)).to.be.undefined
    })
  })
  describe('.destroyEntity()', () => {
    let manager
    before(() => {
      manager = new EntityManager()
    })
    it('should destroy the entity', () => {
      const entity = manager.createEntity()
      const stub = sinon.stub()
      entity.on('destroy', stub)
      manager.destroyEntity(entity.id)
      expect(stub.calledWith(entity)).to.be.true
    })
    it('should do nothing if entity id is unknown', () => {
      expect(() => manager.destroyEntity('xyz')).to.not.throw()
      expect(() => manager.destroyEntity(null)).to.not.throw()
      expect(() => manager.destroyEntity()).to.not.throw()
    })
  })
})
