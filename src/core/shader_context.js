import ShaderVariable from './shader_variable';

/**
 * A ShaderContext holds all references to the current shader variables
 * which will be used by the next draw command ..
 */
export default class ShaderContext {

    constructor () {
        this.uniform = new Map();
        this.attrib = new Map();
        this.tex2d = new Map();
    }

    /**
     * @param {ShaderVariable} shaderVariable
     */
    pushVar(shaderVariable) {
        const lane = shaderVarLane(this, shaderVariable.type, shaderVariable.name);
        lane.push(shaderVariable);
    }

    /**
     * Remove shaderVariable and all later set variables from named shader lane.
     * @param {ShaderVariable} shaderVariable
     */
    popVar(shaderVariable) {
        const lane = shaderVarLane(this, shaderVariable.type, shaderVariable.name);
        const len = lane.length;
        for (let i = 0; i < len; ++i) {
            if (lane[i] === shaderVariable) {
                lane.length = i;
                return;
            }
        }
    }

    /**
     * Get current shader variable by name and type.
     * @param {ShaderVariable} shaderVariable
     * @return {ShaderVariable} or `null`
     */
    curVar(shaderVariable) {
        const lane = shaderVarMap(this, shaderVariable.type).get(shaderVariable.name);
        return lane && lane.length ? lane[lane.length - 1] : null;
    }

    curUniform (name) {
        const lane = this.uniform.get(name);
        return lane && lane.length ? lane[lane.length - 1].value : null;
    }

    curAttrib (name) {
        const lane = this.attrib.get(name);
        return lane && lane.length ? lane[lane.length - 1].value : null;
    }

    curTex2d (name) {
        const lane = this.tex2d.get(name);
        return lane && lane.length ? lane[lane.length - 1].value : null;
    }

}

function shaderVarMap (shaderContext, type) {
    switch (type) {
        case ShaderVariable.UNIFORM:
            return shaderContext.uniform;
        case ShaderVariable.ATTRIB:
            return shaderContext.attrib;
        case ShaderVariable.TEXTURE_2D:
            return shaderContext.tex2d;
    }
}

function shaderVarLane (shaderContext, type, name) {

    const map = shaderVarMap(shaderContext, type);
    let lane = map.get(name);

    if (!lane) {
        lane = [];
        map.set(name, lane);
    }

    return lane;
}

