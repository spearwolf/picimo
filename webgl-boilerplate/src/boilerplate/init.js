import createProgram from './create_program';

export default function init() {

    const vertex_shader = document.getElementById('vs').textContent;
    const fragment_shader = document.getElementById('fs').textContent;
    const canvas = document.querySelector( 'canvas' );

    // Initialise WebGL
    let gl;

    try {

        gl = canvas.getContext( 'experimental-webgl' );

    } catch( error ) { }

    if ( !gl ) {

        throw "cannot create webgl context";

    }

    // Create Program

    const currentProgram = createProgram( gl, vertex_shader, fragment_shader );

    const timeLocation = gl.getUniformLocation( currentProgram, 'time' );
    const resolutionLocation = gl.getUniformLocation( currentProgram, 'resolution' );
    const positionLocation = gl.getAttribLocation( currentProgram, 'position' );

    return {
        vertex_shader,
        fragment_shader,
        canvas,
        gl,
        currentProgram,
        timeLocation,
        resolutionLocation,
        positionLocation
    };
}

