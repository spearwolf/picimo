import {Texture as PicimoTexture, TextureAtlas} from 'picimo';
import {Texture as ThreeTexture} from 'three';

export interface ITextureMap {
  [index: string]: {
    three: ThreeTexture;
    picimo: PicimoTexture;
  };
}

export interface ITextureAtlasMap {
  [index: string]: TextureAtlas;
}

export interface ITextureLoadingMap {
  [index: string]: Promise<PicimoTexture | TextureAtlas>;
}

export interface ITextureState {
  texture: ITextureMap;
  textureAtlas: ITextureAtlasMap;
  loading: ITextureLoadingMap;
}

export const createInitialState = () => {
  const state: ITextureState = {
    texture: {},
    textureAtlas: {},
    loading: {},
  };
  return state;
};

export const getThreeTexture = (state: ITextureState, name: string) =>
  state.texture[name]?.three;
export const getPicimoTexture = (state: ITextureState, name: string) =>
  state.texture[name]?.picimo;
export const getTextureAtlas = (state: ITextureState, name: string) =>
  state.textureAtlas[name];
