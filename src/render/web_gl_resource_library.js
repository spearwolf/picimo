import WebGlShader from './web_gl_shader';
import WebGlProgram from './web_gl_program';

export default class WebGlResourceLibrary {

    constructor (glx) {
        Object.defineProperty(this, 'glx', { value: glx });

        this.vertexShader = new Map;
        this.fragmentShader = new Map;
        this.shaderProgram = new Map;
    }

    loadVertexShader (shaderSource) {
        let glShader = this.vertexShader.get(shaderSource.id);
        if (!glShader) {
            glShader = new WebGlShader(this.glx, shaderSource);
            this.vertexShader.set(shaderSource.id, glShader);
        }
        return glShader;
    }

    loadFragementShader (shaderSource) {
        let glShader = this.fragmentShader.get(shaderSource.id);
        if (!glShader) {
            glShader = new WebGlShader(this.glx, shaderSource);
            this.vertexShader.set(shaderSource.id, glShader);
        }
        return glShader;
    }

    loadProgram (shaderProgram) {
        let program = this.shaderProgram.get(shaderProgram.id);
        if (!program) {
            program = new WebGlProgram(this.glx, shaderProgram);
            this.shaderProgram.set(shaderProgram.id, program);
        }
        return program;
    }

}

