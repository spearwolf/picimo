import {Eventize} from 'eventize-js';
import {Texture as TextureTHREE} from 'three';

import {Texture as TexturePicimo} from './Texture';
import {TextureAtlas} from './TextureAtlas';
import {TextureFactory} from './TextureFactory';
import {IThreeTextureOptions, ThreeTextureOptions} from './ThreeTextureOptions';

type ValueIdType = number;
type ValueObjectType = TexturePicimo | TextureTHREE | TextureAtlas;

interface ITexturePicimoValue {
  valueId: ValueIdType;
  options: string;
  serial: number;
}

interface ITextureThreeValue {
  valueId: ValueIdType;
  // TODO add source type: picimo,dom-element,render-to-texture-framebuffer,etc...
  serial?: number;
  // TODO needsUpdate
}

interface ITextureState {
  picimo?: ITexturePicimoValue;
  three?: ITextureThreeValue;
  atlas?: ValueIdType;
}

interface ITextureStoreState {
  [name: string]: ITextureState;
}

class TextureStore extends Eventize {
  /** immutable texture store state */
  state: ITextureStoreState = {};

  valueObjects = new Map<ValueIdType, ValueObjectType>();
  lastValueId = 0;

  factory: TextureFactory;

  constructor(factory: TextureFactory) {
    super();
    this.factory = factory;
  }

  #storeValueObject = (valObj: ValueObjectType): ValueIdType => {
    const valueId = ++this.lastValueId;
    this.valueObjects.set(valueId, valObj);
    return valueId;
  };

  #updateValueObject = (valueId: ValueIdType, valObj: ValueObjectType) => {
    const current = this.getValueObject(valueId);
    if (current !== valObj) {
      this.valueObjects.delete(valueId);
      return this.#storeValueObject(valObj);
    }
    return valueId;
  };

  getValueObject = (valueId: ValueIdType) => this.valueObjects.get(valueId);

  #updateState = (name: string, state: ITextureState) => {
    this.state = {
      ...this.state,
      [name]: state,
    };
  };

  setPicimoTexture(
    name: string,
    texture: TexturePicimo,
    options?: IThreeTextureOptions,
  ) {
    const state = this.state[name];
    if (state?.picimo === undefined) {
      // create new texture state
      this.#updateState(name, {
        ...state,
        picimo: {
          valueId: this.#storeValueObject(texture),
          options: new ThreeTextureOptions(options).toString(),
          serial: 0,
        },
      });
    } else {
      // update texture state
      const {valueId: curValueId, options: curOptions} = state.picimo;
      const valueId = this.#updateValueObject(curValueId, texture);
      const nextOptions = new ThreeTextureOptions(options).toString();
      if (valueId !== curValueId || nextOptions !== curOptions) {
        this.#updateState(name, {
          ...state,
          picimo: {
            valueId,
            options: nextOptions,
            serial: state.picimo.serial + 1,
          },
        });
      }
    }
  }

  touchPicimoTexture(name: string) {
    const state = this.state[name];
    if (state?.picimo) {
      this.#updateState(name, {
        ...state,
        picimo: {
          ...state.picimo,
          serial: state.picimo.serial + 1,
        },
      });
    }
  }

  #createThreeTexture = (picimoValueId: ValueIdType, options: string) => {
    const threeTexture = this.factory.makeThreeTexture(
      this.getValueObject(picimoValueId) as TexturePicimo,
      ThreeTextureOptions.fromString(options),
    );
    this.emit('threeTextureCreated', threeTexture);
    return threeTexture;
  };

  getThreeTexture(name: string) {
    const state = this.state[name];
    if (state) {
      const {three, picimo} = state;
      if (three) {
        // just return the three texture
        if (!picimo || three.serial === picimo.serial) {
          return this.getValueObject(three.valueId) as TextureTHREE;
        }

        // update three-texture because input source changed
        const curTex = this.getValueObject(three.valueId);
        this.emit('disposeThreeTexture', curTex);
        const threeTexture = this.#createThreeTexture(
          picimo.valueId,
          picimo.options,
        );
        this.#updateState(name, {
          ...state,
          three: {
            valueId: this.#updateValueObject(three.valueId, threeTexture),
            serial: picimo.serial,
          },
        });
        return threeTexture;

        // create new three-texture from picimo-texture
      } else if (picimo) {
        const threeTexture = this.#createThreeTexture(
          picimo.valueId,
          picimo.options,
        );
        this.#updateState(name, {
          ...state,
          three: {
            valueId: this.#storeValueObject(threeTexture),
            serial: picimo.serial,
          },
        });
        return threeTexture;
      }
    }
    return undefined;
  }
}

export {ITextureStoreState, TextureStore};
