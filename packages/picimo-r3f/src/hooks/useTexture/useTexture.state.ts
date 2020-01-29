import {Texture as PicimoTexture, TextureAtlas} from 'picimo';
import {Texture as ThreeTexture} from 'three';

export interface ITextureMap {
  [index: string]: ThreeTexture;
}

export interface ITextureAtlasMap {
  [index: string]: TextureAtlas;
}

export interface ITextureLoadingMap {
  [index: string]: Promise<PicimoTexture|TextureAtlas>;
}

export interface ITextureState {
  texture: ITextureMap;
  textureAtlas: ITextureAtlasMap;
  loading: ITextureLoadingMap;
}

export const createInitialState = () => (<ITextureState>{
  texture: Object.create(null),
  textureAtlas: Object.create(null),
  loading: Object.create(null),
});
