/* eslint-env mocha */
import assert from 'assert'
import ShaderVariable from 'blitpunk/core/shader_variable'
import ShaderUniformVariable from 'blitpunk/core/shader_uniform_variable'
import ShaderAttribVariable from 'blitpunk/core/shader_attrib_variable'
import ShaderTexture2dVariable from 'blitpunk/core/shader_texture_2d_variable'

describe('ShaderVariable', () => {
  it('new ShaderVariable() without value', () => {
    const val = new ShaderVariable('foo', ShaderVariable.TYPE.UNIFORM)
    assert.equal(val.value, undefined)
    assert.equal(val.serial, 0)

    const uniform = new ShaderUniformVariable('uni')
    assert.equal(uniform.value, undefined)
    assert.equal(uniform.serial, 0)

    const attrib = new ShaderAttribVariable('attr')
    assert.equal(attrib.value, undefined)
    assert.equal(attrib.serial, 0)

    const tex = new ShaderTexture2dVariable('tex')
    assert.equal(tex.value, undefined)
    assert.equal(tex.serial, 0)
  })

  it('serial increase on value change', () => {
    const val = new ShaderVariable('bar', ShaderVariable.TYPE.ATTRIB)
    val.value = 16
    assert.equal(val.serial, 1)
    val.value = 32
    assert.equal(val.serial, 2)
    val.value = 32
    assert.equal(val.serial, 2)
  })

  it('touch()', () => {
    const val = new ShaderVariable('plah', ShaderVariable.TYPE.TEXTURE_2D)
    assert.equal(val.serial, 0)
    val.touch()
    assert.equal(val.serial, 1)
  })
})
