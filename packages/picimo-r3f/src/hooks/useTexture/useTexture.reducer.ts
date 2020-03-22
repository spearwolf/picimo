import {Texture, Logger} from 'picimo';

import {makeThreeTexture} from './makeThreeTexture';
import {
  TextureActionType,
  SET_TEXTURE,
  SET_TEXTURE_ATLAS,
  LOAD_TEXTURE,
  LOAD_TEXTURE_ATLAS,
  SetTexture,
  setTextureAtlas,
} from './useTexture.actions';
import {ITextureState, ITextureMap} from './useTexture.state';

const log = new Logger('picimo-r3f.useTexture.reducer');

const appendTexture = (state: ITextureMap, name: string, texture: Texture) => {
  if (log.DEBUG) log.log('appendTexture', name, texture, state);
  const prevTexure = state[name]?.three;
  if (!prevTexure || texture !== state[name]?.picimo) {
    if (prevTexure) {
      if (log.DEBUG) log.log('dispose previous texture', prevTexure);
      prevTexure.dispose();
    }
    const texMap: ITextureMap = {
      ...state,
      // TODO add texture options (add to useTexture())
      [name]: {
        picimo: texture,
        three: makeThreeTexture(texture),
      },
    };
    return texMap;
  }
  return state;
};

export const reducer = (state: ITextureState, action: TextureActionType) => {
  switch (action.type) {
    case SET_TEXTURE: {
      const {name, texture} = action.payload;
      const nextTextureState = appendTexture(state.texture, name, texture);
      if (nextTextureState !== state.texture) {
        const nextState: ITextureState = {
          ...state,
          texture: nextTextureState,
        };
        return nextState;
      }
      return state;
    }

    case SET_TEXTURE_ATLAS: {
      const {name, textureAtlas} = action.payload;
      const nextTextureState = appendTexture(
        state.texture,
        name,
        textureAtlas.baseTexture,
      );
      if (
        state.texture !== nextTextureState ||
        state.textureAtlas[name] !== textureAtlas
      ) {
        return {
          ...state,
          texture: nextTextureState,
          textureAtlas: {
            ...state.textureAtlas,
            [name]: textureAtlas,
          },
        };
      }
      return state;
    }

    case LOAD_TEXTURE: {
      const {name, loading, dispatch} = action.payload;
      // TODO fix equality check!!! texture -> check for options?
      if (loading !== state.loading[name]) {
        loading.then((texture) => dispatch(SetTexture(name, texture)));
        return {
          ...state,
          loading: {
            ...state.loading,
            [name]: loading,
          },
        };
      }
      return state;
    }

    case LOAD_TEXTURE_ATLAS: {
      const {name, loading, dispatch} = action.payload;
      // TODO fix equality check!!! texture -> check for options?
      if (loading !== state.loading[name]) {
        loading.then((textureAtlas) =>
          dispatch(setTextureAtlas(name, textureAtlas)),
        );
        return {
          ...state,
          loading: {
            ...state.loading,
            [name]: loading,
          },
        };
      }
      return state;
    }
  }
};
