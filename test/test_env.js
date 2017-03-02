/* eslint-env mocha */
import assert from 'assert'
import { App } from '../src'

describe('Service: env', () => {
  let env
  const getEnv = () => env
  before(() => new App().service('env').then(function (_env) { env = _env }))

  shouldHaveProperty(getEnv, 'hasWindow')
  shouldHaveProperty(getEnv, 'hasDocument')
  shouldHaveProperty(getEnv, 'hasConsole')
  shouldHaveProperty(getEnv, 'hasWebGL')
  shouldHaveProperty(getEnv, 'hasWebGL2')

  shouldHaveProperty(getEnv, 'isNode')
  shouldHaveProperty(getEnv, 'isWebWorker')
  shouldHaveProperty(getEnv, 'isBrowser')
})

function shouldHaveProperty (getEnv, propName, propType = 'boolean') {
  it(`should have .${propName} property`, () => {
    assert.equal(typeof getEnv()[propName], propType)
  })
}
