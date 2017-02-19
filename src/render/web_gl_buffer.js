
export default class WebGlBuffer {

    constructor (glx, target = WebGlBuffer.ARRAY_BUFFER, usage = WebGlBuffer.STATIC_DRAW) {

        this.glx = glx;

        const { gl } = glx;
        this.target = gl[target];
        this.usage = gl[usage];

        this.glBuffer = gl.createBuffer();

        this.srcData = null;
        this.srcSerial = 0;

    }

    bindBuffer () {
        this.glx.bindBuffer( this.target, this.glBuffer );
    }

    /**
     * @param {VOPool} srcData
     */
    bufferData (srcData) {
        // TODO srcData dirty/type check

        this.bindBuffer();
        this.glx.gl.bufferData( this.target, srcData.voArray.float32Array, this.usage );

        this.srcData = srcData;
        // update srcSerial
    }

}

WebGlBuffer.ARRAY_BUFFER = 'ARRAY_BUFFER';
WebGlBuffer.ELEMENT_ARRAY_BUFFER = 'ELEMENT_ARRAY_BUFFER';

WebGlBuffer.STATIC_DRAW = 'STATIC_DRAW';
WebGlBuffer.DYNAMIC_DRAW = 'DYNAMIC_DRAW';

