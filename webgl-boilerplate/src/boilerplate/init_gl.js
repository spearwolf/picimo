import WebGlContext from '../../../src/render/web_gl_context';

export default function initGl() {

    const canvas = document.querySelector( 'canvas' );

    let gl;
    try {
        gl = canvas.getContext( 'experimental-webgl' );
    } catch( error ) {
    }

    if ( !gl ) {
        throw "cannot create webgl context";
    }

    const glx = new WebGlContext(gl);

    return {
        canvas,
        gl,
        glx
    };
}

