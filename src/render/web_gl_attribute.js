
export default class WebGlAttribute {

    constructor (program, index) {

        this.program = program;
        this.glx = program.glx;

        const { gl } = program.glx;
        const { glProgram } = program;

        const { name, size, type } = gl.getActiveAttrib( glProgram, index );
        this.name = name;
        this.size = size;
        this.type = type;

        this.location = gl.getAttribLocation( glProgram, name );

        Object.freeze(this);

    }

}

