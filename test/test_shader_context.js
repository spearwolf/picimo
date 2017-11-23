/* eslint-env mocha */
import assert from 'assert'
import ShaderContext from 'blitpunk/core/shader_context'
import ShaderVariable from 'blitpunk/core/shader_variable'
import ShaderVariableAlias from 'blitpunk/core/shader_variable_alias'
import ShaderVariableGroup from 'blitpunk/core/shader_variable_group'
import ShaderVariableBufferGroup from 'blitpunk/core/shader_variable_buffer_group'
import ShaderUniformVariable from 'blitpunk/core/shader_uniform_variable'
import ShaderAttribVariable from 'blitpunk/core/shader_attrib_variable'
import ShaderTexture2dVariable from 'blitpunk/core/shader_texture_2d_variable'
import VODescriptor from 'blitpunk/core/v_o_descriptor'
import VOPool from 'blitpunk/core/v_o_pool'

describe('ShaderContext', () => {
  describe('new ShaderContext', () => {
    const ctx = new ShaderContext()

    it('creates a SGNode instance', () => assert(ctx))

    it('add a shader *uniform* variable', () => {
      const sVar = new ShaderUniformVariable('foo', 23)
      ctx.pushVar(sVar)
      assert.equal(ctx.curVar(sVar).value, 23)
      assert.equal(ctx.curUniform(sVar.name).value, 23)
    })

    it('add a shader *attrib* variable', () => {
      const sVar = new ShaderAttribVariable('bar', 66)
      ctx.pushVar(sVar)
      assert.equal(ctx.curVar(sVar).value, 66)
      assert.equal(ctx.curAttrib(sVar.name).value, 66)
    })

    it('add a shader *tex2d* variable', () => {
      const sVar = new ShaderTexture2dVariable('plah', 2008)
      ctx.pushVar(sVar)
      assert.equal(ctx.curVar(sVar).value, 2008)
      assert.equal(ctx.curTex2d(sVar.name).value, 2008)
    })

    it('push and pop variables', () => {
      const sVar1 = new ShaderVariable('p', ShaderVariable.TYPE.UNIFORM, 16)
      const sVar2 = new ShaderVariable('p', ShaderVariable.TYPE.UNIFORM, 32)
      const sVar3 = new ShaderVariable('p', ShaderVariable.TYPE.UNIFORM, 64)

      assert.equal(ctx.curVar(sVar1), null)

      ctx.pushVar(sVar1)
      assert.equal(ctx.curVar(sVar1).value, 16)

      ctx.pushVar(sVar2)
      assert.equal(ctx.curVar(sVar1).value, 32)

      ctx.pushVar(sVar3)
      assert.equal(ctx.curVar(sVar1).value, 64)

      ctx.pushVar(new ShaderVariable('p', ShaderVariable.TYPE.UNIFORM, 100))
      ctx.pushVar(new ShaderVariable('p', ShaderVariable.TYPE.UNIFORM, 101))
      ctx.pushVar(new ShaderVariable('p', ShaderVariable.TYPE.UNIFORM, 102))
      assert.equal(ctx.curVar(sVar1).value, 102)

      ctx.popVar(sVar3)
      assert.equal(ctx.curVar(sVar1).value, 32)

      ctx.popVar(sVar2)
      assert.equal(ctx.curVar(sVar1).value, 16)

      ctx.popVar(sVar1)
      assert.equal(ctx.curVar(sVar1), null)

      ctx.popVar(sVar1)
      ctx.popVar(sVar2)
      ctx.popVar(sVar3)
      assert.equal(ctx.curVar(sVar1), null)
    })
  })

  describe('ShaderVariableGroup -> ShaderContext', () => {
    const ctx = new ShaderContext()
    let group

    it('create', () => {
      const sVarA = new ShaderUniformVariable('poiu', 666)
      assert.equal(sVarA.value, 666)

      const sVarB = new ShaderVariableAlias('ghjk', sVarA)
      assert.equal(sVarB.value, 666)

      group = new ShaderVariableGroup([sVarA, sVarB])
      assert.equal(group.shaderVars.length, 2)
    })

    it('push to context', () => {
      assert.equal(ctx.curUniform('poiu'), null, ':poiu should be null')
      assert.equal(ctx.curUniform('ghjk'), null, ':ghjk should be null')
      // group.pushVar(ctx)
      ctx.pushVar(group)
      assert.equal(ctx.curUniform('poiu').value, 666)
      assert.equal(ctx.curUniform('ghjk').value, 666)
    })

    it('pop from context', () => {
      assert.equal(ctx.curUniform('poiu').value, 666)
      assert.equal(ctx.curUniform('ghjk').value, 666)
      // group.popVar(ctx)
      ctx.popVar(group)
      assert.equal(ctx.curUniform('poiu'), null, ':poiu should be null')
      assert.equal(ctx.curUniform('ghjk'), null, ':ghjk should be null')
    })
  })

  describe('ShaderVariableBufferGroup', () => {
    const descriptor = new VODescriptor({
      // vertex elements layout
      // ----------------------
      //
      // v0: (x0)(y0)(z0)(r0)(g0)(b0)(a)(tx)(ty)
      // v1: (x1)(y1)(z1)(r0)(g1)(b1)(a)(tx)(ty)
      // v2: (x2)(y2)(z2)(r0)(g2)(b2)(a)(tx)(ty)
      //
      vertexCount: 3,

      attributes: [

              { name: 'position', type: 'float32', size: 3, attrNames: [ 'x', 'y', 'z' ] },
              { name: 'color', type: 'uint8', size: 4, attrNames: ['r', 'g', 'b', 'a'] },
              { name: 'translate', type: 'uint16', size: 2, attrNames: [ 'tx', 'ty' ], uniform: true },
              { name: 'b', type: 'uint8', size: 1, uniform: true }

      ]
    })

    const voPool = new VOPool(descriptor)
    const group = new ShaderVariableBufferGroup(voPool)

    it('new ShaderVariableGroup(new VOPool(descriptor))', () => {
      assert.equal(group.shaderVars.length, 4)
      assert.deepEqual(group.shaderVars.map(sVar => sVar.name).sort(), ['position', 'color', 'translate', 'b'].sort())
    })

    it('ShaderAttribVariable.value = { descriptor, bufferSource }', () => {
      assert.equal(group.shaderVars[0].value.descriptor, descriptor)
      assert.equal(group.shaderVars[0].value.bufferSource, voPool)
      assert.equal(group.shaderVars[1].value.descriptor, descriptor)
      assert.equal(group.shaderVars[1].value.bufferSource, voPool)
    })

    it('bufferSource', () => {
      assert.equal(group.bufferSource, voPool)
    })

    it('serial & touch', () => {
      const curSerial = group.shaderVars[0].serial
      assert.equal(curSerial, group.serial)
      group.touch()
      assert.equal(curSerial + 1, group.serial)
      assert.equal(group.serial, group.shaderVars[0].serial)
    })
  })
})
