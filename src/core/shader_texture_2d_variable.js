import ShaderVariable from './shader_variable';

export default class ShaderTexture2dVariable extends ShaderVariable {

    /**
     * @param {string} name
     * @param {number|Object} value
     */
    constructor (name, value) {
        super(name, ShaderVariable.TEXTURE_2D, value);
    }

}

