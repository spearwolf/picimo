import WebGlUniform from './web_gl_uniform';
import WebGlAttribute from './web_gl_attribute';
import WebGlShader from './web_gl_shader';

export default class WebGlProgram {

    constructor (glx, shaderProgram) {

        this.glx = glx;

        this.vertexShader = glx.resourceLibrary.loadVertexShader(shaderProgram.vertexShader);
        this.fragmentShader = glx.resourceLibrary.loadFragementShader(shaderProgram.fragmentShader);

        const { gl } = glx;
        this.glProgram = gl.createProgram();

        linkProgram(this, this.vertexShader.glShader, this.fragmentShader.glShader);
        // TODO gl.deleteShader?

        createUniforms(this);
        createAttributes(this);

        Object.freeze(this);

    }

    use () {
        this.glx.useProgram(this.glProgram);
    }

}

function createAttributes (program) {

    const { gl } = program.glx;
    const len = gl.getProgramParameter( program.glProgram, gl.ACTIVE_ATTRIBUTES );

    program.attributes = {};
    program.attributeNames = [];

    for (let i = 0; i < len; ++i) {
        const attrib = new WebGlAttribute(program, i);
        program.attributes[attrib.name] = attrib;
        program.attributeNames.push(attrib.name);
    }

    Object.freeze(program.attributes);

}

function createUniforms (program) {

    const { gl } = program.glx;
    const len = gl.getProgramParameter( program.glProgram, gl.ACTIVE_UNIFORMS );

    program.uniforms = {};
    program.uniformNames = [];

    for (let i = 0; i < len; ++i) {
        const uniform = new WebGlUniform(program, i);
        program.uniforms[uniform.name] = uniform;
        program.uniformNames.push(uniform.name);
    }

    Object.freeze(program.uniforms);

}

function linkProgram (program, vertexShader, fragmentShader) {

    const { gl } = program.glx;
    const { glProgram } = program;

    gl.attachShader( glProgram, vertexShader );
    gl.attachShader( glProgram, fragmentShader );

    gl.linkProgram( glProgram );

    if ( ! gl.getProgramParameter( glProgram, gl.LINK_STATUS ) ) {

        const err = new Error( 'WebGlProgram link panic!' );
        err.webGlProgram = program;
        throw err;

    }

}

