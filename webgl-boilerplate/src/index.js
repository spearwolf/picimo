// original webgl-boilerplate code based on https://github.com/paulirish/webgl-boilerplate

import init from './boilerplate/init';
import initSprites from './init_sprites';
import initProgram from './init_program';
import animate from './boilerplate/animate';

const parameters = {
    start_time  : new Date().getTime(),
    time        : 0,
    screenWidth : 0,
    screenHeight: 0
};

const state = init();
window.gl = state.gl;

const spriteState = initSprites(state);
const program = initProgram(spriteState.glx);

state.currentProgram = program;
state.buffer = spriteState.buffer;

animate( parameters, state );

