
export default class WebGlContext {

    constructor (gl) {
        Object.defineProperty(this, 'gl', { value: gl });

        this.boundBuffers = new Map;
    }

    bindBuffer (target, buffer) {
        if (this.boundBuffers.get(target) !== buffer) {
            this.gl.bindBuffer(target, buffer);
            this.boundBuffers.set(target, buffer);
        }
    }

}

