import WebGlShader from './web_gl_shader';
import WebGlProgram from './web_gl_program';
import WebGlBuffer from './web_gl_buffer';
import VOPool from '../core/v_o_pool';
import VOArray from '../core/v_o_array';

const WEB_GL_BUFFER_USAGE = Object.freeze({
    'static': WebGlBuffer.STATIC_DRAW,
    'dynamic': WebGlBuffer.DYNAMIC_DRAW,
});

export default class WebGlResourceLibrary {

    constructor (glx) {
        Object.defineProperty(this, 'glx', { value: glx });

        this.vertexShader = new Map;
        this.fragmentShader = new Map;
        this.shaderProgram = new Map;
        this.buffer = new Map;
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

    loadBuffer (voPool) {
        let buffer = this.buffer.get(voPool.voArray.id);
        if (!buffer) {
            buffer = new WebGlBuffer(this.glx, WebGlBuffer.ARRAY_BUFFER, WEB_GL_BUFFER_USAGE[voPool.usage]);
            this.buffer.set(voPool.voArray.id, buffer);
        }
        return buffer;
    }

    /**
     * @param {VOPool|VOArray} resource
     */
    getBuffer (resource) {
        if (resource instanceof VOPool) {
            return this.buffer.get(resource.voArray.id);
        } else if (resource instanceof VOArray) {
            return this.buffer.get(resource.id);
        }
    }

}

