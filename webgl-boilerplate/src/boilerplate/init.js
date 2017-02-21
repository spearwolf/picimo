
export default function init() {

    const canvas = document.querySelector( 'canvas' );

    // Initialise WebGL
    let gl;

    try {

        gl = canvas.getContext( 'experimental-webgl' );

    } catch( error ) { }

    if ( !gl ) {

        throw "cannot create webgl context";

    }

    return {
        canvas,
        gl,
    };
}

