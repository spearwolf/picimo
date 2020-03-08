import {Texture as PicimoTexture, TextureAtlas} from 'picimo';

export const SET_TEXTURE = 'setTexture';
export const LOAD_TEXTURE = 'loadTexture';
export const SET_TEXTURE_ATLAS = 'setTextureAtlas';
export const LOAD_TEXTURE_ATLAS = 'loadTextureAtlas';

export interface ISetTextureAction {
  type: typeof SET_TEXTURE;
  payload: {
    name: string;
    texture: PicimoTexture;
  };
}

export interface ILoadTextureAction {
  type: typeof LOAD_TEXTURE;
  payload: {
    name: string;
    loading: Promise<PicimoTexture>;
    dispatch: DispatchActionFuncType;
  };
}

export interface ISetTextureAtlasAction {
  type: typeof SET_TEXTURE_ATLAS;
  payload: {
    name: string;
    textureAtlas: TextureAtlas;
  };
}

export interface ILoadTextureAtlasAction {
  type: typeof LOAD_TEXTURE_ATLAS;
  payload: {
    name: string;
    loading: Promise<TextureAtlas>;
    dispatch: DispatchActionFuncType;
  };
}

export type TextureActionType =
  | ISetTextureAction
  | ILoadTextureAction
  | ISetTextureAtlasAction
  | ILoadTextureAtlasAction;

export type DispatchActionFuncType = (action: TextureActionType) => void;

export const SetTexture = (name: string, texture: PicimoTexture) => {
  const action: ISetTextureAction = {
    type: SET_TEXTURE,
    payload: {
      name,
      texture,
    },
  };
  return action;
};

export const LoadTexture = (
  name: string,
  loading: Promise<PicimoTexture>,
  dispatch: DispatchActionFuncType,
) => {
  const action: ILoadTextureAction = {
    type: LOAD_TEXTURE,
    payload: {
      name,
      loading,
      dispatch,
    },
  };
  return action;
};

export const setTextureAtlas = (name: string, textureAtlas: TextureAtlas) => {
  const action: ISetTextureAtlasAction = {
    type: SET_TEXTURE_ATLAS,
    payload: {
      name,
      textureAtlas,
    },
  };
  return action;
};

export const LoadTextureAtlas = (
  name: string,
  loading: Promise<TextureAtlas>,
  dispatch: DispatchActionFuncType,
) => {
  const action: ILoadTextureAtlasAction = {
    type: LOAD_TEXTURE_ATLAS,
    payload: {
      name,
      loading,
      dispatch,
    },
  };
  return action;
};
