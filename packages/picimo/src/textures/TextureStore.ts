import {Eventize} from 'eventize-js';
import {Texture as TextureTHREE} from 'three';

import {Texture as TexturePicimo} from './Texture';
import {TextureAtlas} from './TextureAtlas';
import {TextureFactory} from './TextureFactory';
import {IThreeTextureOptions, ThreeTextureOptions} from './ThreeTextureOptions';

type ValueIdType = number;

interface ITexturePicimoValue {
  valueId: ValueIdType;
  options: string;
  serial: number;
}

const SOURCE_TYPE_PICIMO = 'picimo';

interface ITextureSourcePicimo {
  type: typeof SOURCE_TYPE_PICIMO;
  serial: number;
}

// TODO add more source types: render-to-texture-framebuffer,TileSet,TextureIndexedAtlas,three,dom-element,array-buffer,etc...
type TextureSourceType = ITextureSourcePicimo;

interface ITextureThreeValue {
  valueId: ValueIdType;
  source: TextureSourceType;
  // TODO needsUpdate? => touchThreeTexture()
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

  valueObjects = new Map<ValueIdType, unknown>();
  lastValueId = 0;

  factory: TextureFactory;

  constructor(factory: TextureFactory) {
    super();
    this.factory = factory;
  }

  #storeValueObject = (valObj: unknown): ValueIdType => {
    const valueId = ++this.lastValueId;
    this.valueObjects.set(valueId, valObj);
    return valueId;
  };

  #updateValueObject = (valueId: ValueIdType, valObj: unknown) => {
    const current = this.getValueObject(valueId);
    if (current !== valObj) {
      this.valueObjects.delete(valueId);
      return this.#storeValueObject(valObj);
    }
    return valueId;
  };

  getValueObject = <T>(valueId: ValueIdType) =>
    this.valueObjects.get(valueId) as T;

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

  // TODO add support for three texture options?
  // TODO add support for TextureIndexedAtlas!
  setTextureAtlas(name: string, atlas: TextureAtlas) {
    const state = this.state[name];
    if (state?.atlas == null) {
      this.#updateState(name, {
        ...state,
        atlas: this.#storeValueObject(atlas),
      });
    } else {
      const {atlas: curValueId} = state;
      const nextValueId = this.#updateValueObject(curValueId, atlas);
      if (nextValueId !== curValueId) {
        this.#updateState(name, {
          ...state,
          atlas: nextValueId,
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
      this.getValueObject(picimoValueId),
      ThreeTextureOptions.fromString(options),
    );
    this.emit('threeTextureCreated', threeTexture);
    return threeTexture;
  };

  getTextureAtlas(name: string): TextureAtlas {
    const valueId = this.state[name]?.atlas;
    if (valueId) {
      return this.getValueObject(valueId);
    }
    return undefined;
  }

  getThreeTexture(name: string): TextureTHREE {
    const state = this.state[name];
    if (state) {
      const {three, picimo} = state;
      if (three) {
        const {source} = three;
        if (source?.type === SOURCE_TYPE_PICIMO) {
          // just return the three texture
          if (source.serial === picimo.serial) {
            return this.getValueObject(three.valueId);
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
              source: {
                ...source,
                serial: picimo.serial,
              },
            },
          });
          return threeTexture;
        }
        throw new Error(
          `TextureStore: unknown three source type "${source?.type}"`,
        );
      } else if (picimo) {
        // create new three-texture from picimo-texture
        const threeTexture = this.#createThreeTexture(
          picimo.valueId,
          picimo.options,
        );
        this.#updateState(name, {
          ...state,
          three: {
            valueId: this.#storeValueObject(threeTexture),
            source: {
              type: SOURCE_TYPE_PICIMO,
              serial: picimo.serial,
            },
          },
        });
        return threeTexture;
      }
    }
    return undefined;
  }

  // TODO touchThreeTexture() => needsUpdate?

  // TODO getPicimoTexture()

  // TODO loadPicimoTexture()
  // TODO loadTextureAtlas()

  // TODO useRenderTarget()

  // TODO remove*()
  // TODO dispose()
}

export {ITextureStoreState, TextureStore};
