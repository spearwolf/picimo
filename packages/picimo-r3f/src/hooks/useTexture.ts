import {createContext, useState, useContext} from 'react';
import {Texture as PicimoTexture, TextureAtlas, Logger} from 'picimo';
import {Texture as ThreeTexture, NearestFilter} from 'three';

const log = new Logger('useTexture', 0, Infinity);

interface ITextureMap {
  [index: string]: ThreeTexture;
}

interface ITextureAtlasMap {
  [index: string]: TextureAtlas;
}

interface ITextureLoadingMap {
  [index: string]: Promise<PicimoTexture|TextureAtlas>;
}

interface ITextureState {
  texture: ITextureMap;
  textureAtlas: ITextureAtlasMap;
  loading: ITextureLoadingMap;
}

const initialState: ITextureState = {
  texture: Object.create(null),
  textureAtlas: Object.create(null),
  loading: Object.create(null),
}

interface ITextureContext {
  state: ITextureState;
  dispatch: (action: ITextureAction) => void;
}

export const TextureContext = createContext<ITextureContext>({ state: initialState, dispatch: undefined });

type TextureActionType = 'loadTextureAtlas' | 'loadTexture' | 'setTexture' | 'setTextureAtlas';

interface ITextureAction {
  type: TextureActionType,
  payload: {
    name: string,
    texture?: PicimoTexture,
    textureAtlas?: TextureAtlas,
    loading?: Promise<PicimoTexture|TextureAtlas>,
    dispatch: React.Dispatch<ITextureAction>,
  }
}

const makeThreeTexture = (picimoTexture: PicimoTexture) => {

  const texture = new ThreeTexture(picimoTexture.imgEl);

  texture.flipY = false;
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.needsUpdate = true;

  return texture;
}

const reducer = (state: ITextureState, action: ITextureAction) => {
  const { payload } = action;
  switch (action.type) {

    case 'setTexture':
      return {
        ...state,
        texture: {
          ...state.texture,
          // TODO dispose previous texture
          // TODO texture options (from useTexture()??)
          [payload.name]: makeThreeTexture(payload.texture),
        }};

    case 'setTextureAtlas':
      return {
        ...state,
        texture: {
          ...state.texture,
          // TODO dispose previous texture
          // TODO texture options (from useTexture()??)
          [payload.name]: makeThreeTexture(payload.textureAtlas.baseTexture),
        },
        textureAtlas: {
          ...state.textureAtlas,
          [payload.name]: payload.textureAtlas,
        }
      };

    case 'loadTexture':
      // TODO fix equality check!!! THREE.Texture !== picimo.Texture -> and consider options
      if (payload.loading !== state.loading[payload.name]) {
        payload.loading?.then(texture => payload.dispatch(<ITextureAction>{
          type: 'setTexture',
          payload: {
            name: payload.name,
            texture,
          },
        }));
        return { ...state, loading: { ...state.loading, [payload.name]: payload.loading }};
      }

    case 'loadTextureAtlas':
      // TODO fix equality check!!! THREE.Texture !== picimo.Texture -> and consider options
      if (payload.loading !== state.loading[payload.name]) {
        payload.loading?.then(textureAtlas => payload.dispatch(<ITextureAction>{
          type: 'setTextureAtlas',
          payload: {
            name: payload.name,
            textureAtlas,
          },
        }));
        return { ...state, loading: { ...state.loading, [payload.name]: payload.loading }};
      }
  }

  return state;
}

export const useTextureContext = () => {

  const [state, setState] = useState(initialState);

  const dispatch = (action: ITextureAction) => {
    const nextState = reducer(state, action);
    if (nextState !== state) {
      log.log('next state', nextState);
      setState(nextState);
    }
  };

  return {
    state,
    dispatch,
  };
}

export const useTexture = (name: string = 'default', option?: { textureAtlas: boolean }) => {

  // TODO what about parent context?
  const { state, dispatch } = useContext(TextureContext);

  log.log(name, option, state);

  return [
    option?.textureAtlas ? state.textureAtlas[name] : state.texture[name],

    // TODO change setter signature <=> name
    (t: Promise<PicimoTexture|TextureAtlas>|PicimoTexture|TextureAtlas) => {
      let action: ITextureAction;

      if (t instanceof PicimoTexture) {
        action = <ITextureAction>{ type: 'setTexture', payload: {name, texture: t }};
      } else if (t instanceof TextureAtlas) {
        action = <ITextureAction>{ type: 'setTextureAtlas', payload: { name, textureAtlas: t }};
      } else if (t instanceof Promise) {
        if (option?.textureAtlas) {
          action = <ITextureAction>{ type: 'loadTextureAtlas', payload: { dispatch, name, loading: t }};
        } else {
          action = <ITextureAction>{ type: 'loadTexture', payload: { dispatch, name, loading: t }};
        }
      }

      if (action) {
        log.log('dispatch', action);
        dispatch(action);
      }

      return t;
    }
  ];
}

export const useTextureAtlas = (name: string = 'default') => useTexture(name, {textureAtlas: true});
