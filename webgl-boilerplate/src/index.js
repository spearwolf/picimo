// original webgl-boilerplate code based on https://github.com/paulirish/webgl-boilerplate

import init from './boilerplate/init';
import initSprites from './init_sprites';
import animate from './boilerplate/animate';

const parameters = {
    start_time  : new Date().getTime(),
    time        : 0,
    screenWidth : 0,
    screenHeight: 0
};

const state = init();
const spriteState = initSprites(state);

state.buffer = spriteState.buffer;

animate( parameters, state );

