/* eslint-env mocha */
/* eslint no-unused-expressions: 0 */
import { expect } from 'chai'
import sinon from 'sinon'
import ComponentRegistry from 'src/ecs/component_registry'
import EntityManager from 'src/ecs/entity_manager'

describe('ComponentRegistry', () => {
  it('should be instanceable', () => {
    expect(new ComponentRegistry()).to.be.ok
  })
  describe('register component and add to entity', () => {
    const registry = new ComponentRegistry()
    const entityManager = new EntityManager()
    const entity = entityManager.createEntity()
    const myFactory = {}

    it('.registerComponent() should add the factory to the registry', () => {
      registry.registerComponent('my', myFactory)
      expect(registry.registry.get('my')).to.be.equal(myFactory)
    })

    describe('should create a new component and attach it to the entity', () => {
      const myComponentInstance = {
        plah: 123,
        connectedEntity: sinon.stub()
      }

      before(() => {
        myFactory.create = sinon.stub()
        myFactory.create.returns(myComponentInstance)
        myFactory.update = sinon.stub()
        registry.createOrUpdateComponent(entity, 'my', { foo: 'bar' })
      })

      it('componentFactory->create(entity, data) should be called', () => {
        expect(myFactory.create.calledWith(entity, { foo: 'bar' })).to.be.true
      })

      it('entity.my property should be set to the component', () => {
        expect(entity.my).to.have.property('plah', 123)
      })

      it('component->connectedEntity(entity) should be called', () => {
        expect(myComponentInstance.connectedEntity.calledWith(entity)).to.be.true
      })

      it('next call to .createOrUpdateComponent(..., data) should call componentFactory->update(component, data)', () => {
        expect(myComponentInstance.connectedEntity).to.have.property('called', true)
        expect(myFactory.update).to.have.property('called', false)
        registry.createOrUpdateComponent(entity, 'my', { bar: 'plah!' })
        expect(myFactory.update.calledWith(myComponentInstance, { bar: 'plah!' })).to.be.true
      })
    })
  })
})
