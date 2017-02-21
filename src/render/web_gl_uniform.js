
export default class WebGlUniform {

    constructor (program, index) {

        this.program = program;
        this.glx = program.glx;

        const { gl } = program.glx;
        const { glProgram } = program;

        const { name, size, type } = gl.getActiveUniform( glProgram, index );
        this.name = name;
        this.size = size;
        this.type = type;

        this.location = gl.getUniformLocation( glProgram, name );

        Object.freeze(this);

    }

}

