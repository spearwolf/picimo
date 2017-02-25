import ShaderVariable from './shader_variable';

/**
 * Shader attribute variable.
 */
export default class ShaderAttribVariable extends ShaderVariable {

    /**
     * @param {string} name
     * @param {number|Object} value
     */
    constructor (name, value) {
        super(name, ShaderVariable.ATTRIB, value);
    }

}

