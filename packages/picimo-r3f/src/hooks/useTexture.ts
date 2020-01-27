import {createContext, useState, useContext, useMemo} from 'react';
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

type TextureSetterType = (texture: Promise<PicimoTexture|TextureAtlas>|PicimoTexture|TextureAtlas) => void;

interface ITextureContext {
  state: ITextureState;
  dispatch: (name: string, isTextureAtlas: boolean) => TextureSetterType;
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

  const dispatch = useMemo(
    () => (name: string, isTextureAtlas: boolean) => (tex: Promise<PicimoTexture|TextureAtlas>|PicimoTexture|TextureAtlas) => {

    const dispatchAction = (action: ITextureAction) => {
      const nextState = reducer(state, action);
      if (nextState !== state) {
        log.log('next state', nextState);
        setState(nextState);
      }
    };

    let action: ITextureAction;

    if (tex instanceof PicimoTexture) {
      action = <ITextureAction>{ type: 'setTexture', payload: {name, texture: tex }};
    } else if (tex instanceof TextureAtlas) {
      action = <ITextureAction>{ type: 'setTextureAtlas', payload: { name, textureAtlas: tex }};
    } else if (tex instanceof Promise) {
      if (isTextureAtlas) {
        action = <ITextureAction>{ type: 'loadTextureAtlas', payload: { dispatch: dispatchAction, name, loading: tex }};
      } else {
        action = <ITextureAction>{ type: 'loadTexture', payload: { dispatch: dispatchAction, name, loading: tex }};
      }
    }

    if (action) {
      log.log('dispatch', action);
      dispatchAction(action);
    }

    return tex;
  }, [state, setState]);

  return {
    state,
    dispatch,
  };
}

export const useTexture = (name: string = 'default', option?: { textureAtlas: boolean }) => {

  // TODO what about parent context?
  const { state, dispatch } = useContext(TextureContext);

  const isTextureAtlas = Boolean(option?.textureAtlas);
  const textureSetter = useMemo(
    () => dispatch(name, isTextureAtlas),
    [dispatch, name, isTextureAtlas]
  );

  log.log(name, option, state);

  return [
    option?.textureAtlas ? state.textureAtlas[name] : state.texture[name],
    textureSetter,
  ];
}

export const useTextureAtlas = (name: string = 'default') => useTexture(name, {textureAtlas: true});
