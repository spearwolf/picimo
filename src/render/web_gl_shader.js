
export default class WebGlShader {

    constructor (glx, type, source) {

        this.glx = glx;

        this.source = source instanceof HTMLElement ? source.textContent : source.toString();

        const { gl } = glx;
        this.shaderType = gl[type];

        this.glShader = gl.createShader(this.shaderType);
        compileShader(this);

        Object.freeze(this);

    }

}

function compileShader (shader) {

    const { gl } = shader.glx;
    const { glShader, source } = shader;

    gl.shaderSource( glShader, source );
    gl.compileShader( glShader );

    if ( ! gl.getShaderParameter( glShader, gl.COMPILE_STATUS ) ) {

        const shaderInfoLog = gl.getShaderInfoLog( glShader );

        console.error(shaderInfoLog);
        console.group('shader-info');
        console.debug('shaderSource', shader);
        console.log(source);
        console.groupEnd();

        const err = new Error( 'WebGlShader compile panic!' );
        err.webGlShader = shader;
        err.shaderInfoLog = shaderInfoLog;
        throw err;

    }

}

WebGlShader.VERTEX_SHADER = 'VERTEX_SHADER';
WebGlShader.FRAGMENT_SHADER = 'FRAGMENT_SHADER';

