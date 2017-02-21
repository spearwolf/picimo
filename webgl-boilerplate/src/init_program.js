import WebGlProgram from '../../src/render/web_gl_program';

export default function ( glx ) {

    const vertexShader = document.getElementById('vs');
    const fragmentShader = document.getElementById('fs');

    return new WebGlProgram(glx, vertexShader, fragmentShader);

}

