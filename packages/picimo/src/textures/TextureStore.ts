/*

  new TextureStore(state = {})

  TextureFactory -> IThreeTextureOptions

  [texture,setTexture] = useTexture(url,options)
  [texture,setTexture] = useTextureTHREE(url,options)
  [textureAtlas,setTextureAtlas] = useTextureAtlas(url,options)

*/

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
}

interface ITextureState {
  picimo?: ITexturePicimoValue;
  three?: ITextureThreeValue;
  atlas?: ValueIdType;
}

interface ITextureStoreState {
  [name: string]: ITextureState;
}

class TextureStore {
  valueObjects = new Map<ValueIdType, ValueObjectType>();

  /** immutable texture store state */
  state: ITextureStoreState = {};

  factory: TextureFactory;

  private lastValueId = 0;

  constructor(factory: TextureFactory) {
    this.factory = factory;
  }

  private storeValueObject(valObj: ValueObjectType): ValueIdType {
    const valueId = ++this.lastValueId;
    this.valueObjects.set(valueId, valObj);
    return valueId;
  }

  private updateValueObject(valueId: ValueIdType, valObj: ValueObjectType) {
    const current = this.getValueObject(valueId);
    if (current !== valObj) {
      this.valueObjects.delete(valueId);
      return this.storeValueObject(valObj);
    }
    return valueId;
  }

  private getValueObject(valueId: ValueIdType) {
    return this.valueObjects.get(valueId);
  }

  private updateState(name: string, state: ITextureState) {
    this.state = {
      ...this.state,
      [name]: state,
    };
  }

  setTexture(
    name: string,
    texture: TexturePicimo,
    options?: IThreeTextureOptions,
  ) {
    const state = this.state[name];
    if (state?.picimo === undefined) {
      // create new texture state
      this.updateState(name, {
        ...state,
        picimo: {
          valueId: this.storeValueObject(texture),
          options: new ThreeTextureOptions(options).toString(),
          serial: 0,
        },
      });
    } else {
      // update texture state
      const {valueId: curValueId, options: curOptions} = state.picimo;
      const valueId = this.updateValueObject(curValueId, texture);
      const nextOptions = new ThreeTextureOptions(options).toString();
      if (valueId !== curValueId || nextOptions !== curOptions) {
        this.updateState(name, {
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

  touchTexture(name: string) {
    const state = this.state[name];
    if (state.picimo) {
      this.updateState(name, {
        ...state,
        picimo: {
          ...state.picimo,
          serial: state.picimo.serial + 1,
        },
      });
    }
  }

  getTextureTHREE(name: string) {
    const state = this.state[name];
    if (state) {
      const {three, picimo} = state;
      if (three) {
        if (picimo && three.serial !== picimo.serial) {
          // update three-texture because input source changed
          const curTex = this.getValueObject(three.valueId) as TextureTHREE;
          if (curTex.dispose) {
            curTex.dispose(); // XXX maybe dispatch an event here?
          }
          const threeTexture = this.factory.makeThreeTexture(
            this.getValueObject(picimo.valueId) as TexturePicimo,
            ThreeTextureOptions.fromString(picimo.options),
          );
          this.updateState(name, {
            ...state,
            three: {
              valueId: this.updateValueObject(three.valueId, threeTexture),
              serial: picimo.serial,
            },
          });
          return threeTexture;
        }
        // just return three texture
        return this.getValueObject(three.valueId) as TextureTHREE;
      } else if (picimo) {
        // create new three-texture from picimo-texture
        const threeTexture = this.factory.makeThreeTexture(
          this.getValueObject(picimo.valueId) as TexturePicimo,
          ThreeTextureOptions.fromString(picimo.options),
        );
        this.updateState(name, {
          ...state,
          three: {
            valueId: this.storeValueObject(threeTexture),
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
