import {ITextureState} from './useTexture.state';
import {TextureActionType, SET_TEXTURE, SET_TEXTURE_ATLAS, LOAD_TEXTURE, LOAD_TEXTURE_ATLAS, SetTexture, setTextureAtlas} from './useTexture.actions';
import {makeThreeTexture} from './makeThreeTexture';

export const reducer = (state: ITextureState, action: TextureActionType) => {
  switch (action.type) {

    case SET_TEXTURE: {
      const {name, texture} = action.payload;
      return {
        ...state,
        texture: {
          ...state.texture,
          // TODO dispose previous texture
          // TODO texture options (from useTexture()??)
          [name]: makeThreeTexture(texture),
        }};
    }

    case SET_TEXTURE_ATLAS: {
      const {name, textureAtlas} = action.payload;
      return {
        ...state,
        texture: {
          ...state.texture,
          // TODO dispose previous texture
          // TODO texture options (from useTexture()??)
          [name]: makeThreeTexture(textureAtlas.baseTexture),
        },
        textureAtlas: {
          ...state.textureAtlas,
          [name]: textureAtlas,
        }
      };
    }

    case LOAD_TEXTURE: {
      const {name, loading, dispatch} = action.payload;
      // TODO fix equality check!!! THREE.Texture !== picimo.Texture -> and consider options
      if (loading !== state.loading[name]) {
        loading.then(texture => dispatch(SetTexture(name, texture)));
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
      // TODO fix equality check!!! THREE.Texture !== picimo.Texture -> and consider options
      if (loading !== state.loading[name]) {
        loading.then(textureAtlas => dispatch(setTextureAtlas(name, textureAtlas)));
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
}
