/* global describe */
/* global it */
import assert from 'assert';
import ShaderContext from '../src/core/shader_context';
import ShaderVariable from '../src/core/shader_variable';
import ShaderUniformVariable from '../src/core/shader_uniform_variable';
import ShaderAttribVariable from '../src/core/shader_attrib_variable';
import ShaderTexture2dVariable from '../src/core/shader_texture_2d_variable';

describe('ShaderContext', () => {

    describe('new ShaderContext', () => {

        const ctx = new ShaderContext();

        it('creates a SGNode instance', () => assert(ctx));

        it('add a shader *uniform* variable', () => {
            const sVar = new ShaderUniformVariable('foo', 23);
            ctx.pushVar(sVar);
            assert.equal(ctx.curVar(sVar).value, 23);
            assert.equal(ctx.curUniform(sVar.name).value, 23);
        });

        it('add a shader *attrib* variable', () => {
            const sVar = new ShaderAttribVariable('bar', 66);
            ctx.pushVar(sVar);
            assert.equal(ctx.curVar(sVar).value, 66);
            assert.equal(ctx.curAttrib(sVar.name).value, 66);
        });

        it('add a shader *tex2d* variable', () => {
            const sVar = new ShaderTexture2dVariable('plah', 2008);
            ctx.pushVar(sVar);
            assert.equal(ctx.curVar(sVar).value, 2008);
            assert.equal(ctx.curTex2d(sVar.name).value, 2008);
        });

        it('push and pop variables', () => {
            const sVar1 = new ShaderVariable('p', ShaderVariable.UNIFORM, 16);
            const sVar2 = new ShaderVariable('p', ShaderVariable.UNIFORM, 32);
            const sVar3 = new ShaderVariable('p', ShaderVariable.UNIFORM, 64);

            assert.equal(ctx.curVar(sVar1), null);

            ctx.pushVar(sVar1);
            assert.equal(ctx.curVar(sVar1).value, 16);

            ctx.pushVar(sVar2);
            assert.equal(ctx.curVar(sVar1).value, 32);

            ctx.pushVar(sVar3);
            assert.equal(ctx.curVar(sVar1).value, 64);

            ctx.pushVar(new ShaderVariable('p', ShaderVariable.UNIFORM, 100));
            ctx.pushVar(new ShaderVariable('p', ShaderVariable.UNIFORM, 101));
            ctx.pushVar(new ShaderVariable('p', ShaderVariable.UNIFORM, 102));
            assert.equal(ctx.curVar(sVar1).value, 102);

            ctx.popVar(sVar3);
            assert.equal(ctx.curVar(sVar1).value, 32);

            ctx.popVar(sVar2);
            assert.equal(ctx.curVar(sVar1).value, 16);

            ctx.popVar(sVar1);
            assert.equal(ctx.curVar(sVar1), null);

            ctx.popVar(sVar1);
            ctx.popVar(sVar2);
            ctx.popVar(sVar3);
            assert.equal(ctx.curVar(sVar1), null);
        });
    });

});

