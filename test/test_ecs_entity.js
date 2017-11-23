/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
// import eventize from '@spearwolf/eventize'
import { expect } from 'chai'
import sinon from 'sinon'
import Entity from 'blitpunk/ecs/entity'

describe('Entity', () => {
  it('should be instanceable', () => {
    expect(new Entity()).to.be.ok
  })
  it('should have an .id', () => {
    expect(new Entity().id).to.be.a('string')
  })
  it('should have a .hasComponent() function', () => {
    expect(new Entity().hasComponent).to.be.a('function')
  })
  it('should have a .setComponent() function', () => {
    expect(new Entity().setComponent).to.be.a('function')
  })
  it('should have a .destroyComponent() function', () => {
    expect(new Entity().destroyComponent).to.be.a('function')
  })
  it('should have a .destroy() function', () => {
    expect(new Entity().destroy).to.be.a('function')
  })
  describe('.setComponent()', () => {
    it('should attach the component as property', () => {
      const entity = new Entity()
      const component = {}
      expect(entity.fooBar).to.be.undefined
      entity.setComponent('fooBar', component)
      expect(entity.fooBar).to.equal(component)
    })
    it('should throw an error when component is already registered', () => {
      const entity = new Entity()
      entity.setComponent('plotz', {})
      expect(() => entity.setComponent('plotz', {})).to.throw()
    })
    it('should call component->connectedEntity() with the entity as argument', () => {
      const entity = new Entity()
      const component = {
        connectedEntity: sinon.stub()
      }
      entity.setComponent('plah', component)
      expect(component.connectedEntity).to.have.property('called', true)
      expect(component.connectedEntity.calledWith(entity)).to.be.true
    })
    it('should return the entity', () => {
      const entity = new Entity()
      expect(entity.setComponent('fooBar', {})).to.equal(entity)
    })
  })
  describe('.hasComponent()', () => {
    it('should return whether a component was attached', () => {
      const entity = new Entity()
      const component = {}
      expect(entity.hasComponent('abc')).to.be.false
      entity.setComponent('abc', component)
      expect(entity.hasComponent('abc')).to.be.true
    })
  })
  describe('.destroyComponent()', () => {
    it('should remove the component property', () => {
      const entity = new Entity()
      entity.setComponent('abc', {})
      expect(entity.abc).to.be.ok
      expect(entity.hasComponent('abc')).to.be.true
      entity.destroyComponent('abc')
      expect(entity.abc).to.be.undefined
      expect(entity.hasComponent('abc')).to.be.false
    })
    it('should not throw an error when the component is not defined', () => {
      const entity = new Entity()
      expect(() => entity.destroyComponent('notDefined')).to.not.throw()
    })
    it('should return the entity', () => {
      const entity = new Entity()
      expect(entity.destroyComponent('fooBar')).to.equal(entity)
    })
    it('should call component->disconnectedEntity() with the entity as argument', () => {
      const entity = new Entity()
      const component = {
        disconnectedEntity: sinon.stub()
      }
      entity.setComponent('foo', component)
      expect(component.disconnectedEntity.called, 'disconnectedEntity() should be not called before destroyComponent()').to.be.false
      entity.destroyComponent('foo')
      expect(component.disconnectedEntity.called, 'disconnectedEntity() should be called').to.be.true
      expect(component.disconnectedEntity.calledWith(entity)).to.be.true
    })
  })
  describe('.destroy()', () => {
    it('should destroy all components', () => {
      const entity = new Entity()
      const c1 = { disconnectedEntity: sinon.stub() }
      const c2 = { disconnectedEntity: sinon.stub() }
      entity.setComponent('abc', c1)
      entity.setComponent('def', c2)
      expect(c1.disconnectedEntity).to.have.property('called', false)
      expect(c2.disconnectedEntity).to.have.property('called', false)
      entity.destroy()
      expect(c1.disconnectedEntity).to.have.property('called', true)
      expect(c2.disconnectedEntity).to.have.property('called', true)
    })
    it('should emit the "destroy" event', () => {
      const entity = new Entity()
      const stub = sinon.stub()
      entity.on('destroy', stub)
      expect(stub).to.have.property('called', false)
      entity.destroy()
      expect(stub).to.have.property('called', true)
    })
  })
})
