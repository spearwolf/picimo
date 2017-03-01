/* eslint-env mocha */
import assert from 'assert'
import { App } from '../src'

describe('App', () => {
  it('should be instanceable', () => {
    assert(new App())
  })

  it('should have .service() method', () => {
    assert.equal(typeof new App().service, 'function')
  })

  it('should have .createEntity() method', () => {
    assert.equal(typeof new App().createEntity, 'function')
  })

  it('should have static Component() helper', () => {
    assert.equal(typeof App.Component, 'function')
  })

  it('should have static Service() helper', () => {
    assert.equal(typeof App.Service, 'function')
  })
})

