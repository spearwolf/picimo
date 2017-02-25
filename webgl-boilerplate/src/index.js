// original webgl-boilerplate code based on https://github.com/paulirish/webgl-boilerplate

import initGl from './boilerplate/init_gl';
import initSprites from './init_sprites';
import animate from './boilerplate/animate';

import ShaderSource from '../../src/core/shader_source';
import ShaderProgram from '../../src/core/shader_program';
import ShaderContext from '../../src/core/shader_context';
import ShaderUniformVariable from '../../src/core/shader_uniform_variable';

const parameters = {
    start_time  : new Date().getTime(),
    time        : 0,
    screenWidth : 0,
    screenHeight: 0
};

const sCtx = new ShaderContext();
sCtx.pushVar(new ShaderUniformVariable('time'));
sCtx.pushVar(new ShaderUniformVariable('resolution'));

const state = initGl();

const { voPool, buffer } = initSprites(state.glx);

const program = new ShaderProgram(
    new ShaderSource(ShaderSource.VERTEX_SHADER, document.getElementById('vs')),
    new ShaderSource(ShaderSource.FRAGMENT_SHADER, document.getElementById('fs')) );


state.program = program;
state.buffer = buffer;
state.sCtx = sCtx;

animate( parameters, state );

