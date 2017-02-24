/**
 * Generic container for shader variables. eg. uniform, vertex attributes, textures ..
 */
export default class ShaderVariable {

    /**
     * @param {string} name
     * @param {string} type
     * @param {number|Object} value
     */
    constructor (name, type, value) {

        this.name = name;
        this.type = type;
        this.value = value;

    }

}

ShaderVariable.UNIFORM = 'uniform';
ShaderVariable.ATTRIB = 'attrib';
ShaderVariable.TEXTURE_2D = 'tex2d';

