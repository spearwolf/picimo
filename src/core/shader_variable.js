/**
 * Generic container for shader variables. eg. uniform, vertex attributes, textures ..
 * @desc
 * Each time you change the value, a serial number will be increased.
 * Use `.touch()` if you want to increase the serial number without changing the value.
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
        this._value = value;

        /**
         * The serial number increases each time you change the value.
         * @type {number}
         */
        this.serial = 0;

    }

    get value () {
        return this._value;
    }

    set value (val) {
        if (this._value !== val) {
            this._value = val;
            ++this.serial;
        }
    }

    /**
     * Increase serial number.
     */
    touch () {
        ++this.serial;
    }

}

ShaderVariable.UNIFORM = 'uniform';
ShaderVariable.ATTRIB = 'attrib';
ShaderVariable.TEXTURE_2D = 'tex2d';

