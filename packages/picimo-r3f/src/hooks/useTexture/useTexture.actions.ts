import {Texture as PicimoTexture, TextureAtlas} from 'picimo';

export const SET_TEXTURE = 'setTexture';
export const LOAD_TEXTURE = 'loadTexture';
export const SET_TEXTURE_ATLAS = 'setTextureAtlas';
export const LOAD_TEXTURE_ATLAS = 'loadTextureAtlas';

export interface ISetTextureAction {
  type: typeof SET_TEXTURE,
  payload: {
    name: string,
    texture: PicimoTexture,
  }
}

export interface ILoadTextureAction {
  type: typeof LOAD_TEXTURE,
  payload: {
    name: string,
    loading: Promise<PicimoTexture>,
    dispatch: DispatchActionFuncType,
  }
}

export interface ISetTextureAtlasAction {
  type: typeof SET_TEXTURE_ATLAS,
  payload: {
    name: string,
    textureAtlas: TextureAtlas,
  }
}

export interface ILoadTextureAtlasAction {
  type: typeof LOAD_TEXTURE_ATLAS,
  payload: {
    name: string,
    loading: Promise<TextureAtlas>,
    dispatch: DispatchActionFuncType,
  }
}

export type TextureActionType = ISetTextureAction | ILoadTextureAction | ISetTextureAtlasAction | ILoadTextureAtlasAction;

export type DispatchActionFuncType = (action: TextureActionType) => void;

export const SetTexture = (name: string, texture: PicimoTexture) => (<ISetTextureAction>{
  type: SET_TEXTURE,
  payload: {
    name,
    texture,
  },
});

export const LoadTexture = (name: string, loading: Promise<PicimoTexture>, dispatch: DispatchActionFuncType) => (<ILoadTextureAction>{
  type: LOAD_TEXTURE,
  payload: {
    name,
    loading,
    dispatch,
  },
});

export const setTextureAtlas = (name: string, textureAtlas: TextureAtlas) => (<ISetTextureAtlasAction>{
  type: SET_TEXTURE_ATLAS,
  payload: {
    name,
    textureAtlas,
  },
});

export const LoadTextureAtlas = (name: string, loading: Promise<TextureAtlas>, dispatch: DispatchActionFuncType) => (<ILoadTextureAtlasAction>{
  type: LOAD_TEXTURE_ATLAS,
  payload: {
    name,
    loading,
    dispatch,
  },
});
