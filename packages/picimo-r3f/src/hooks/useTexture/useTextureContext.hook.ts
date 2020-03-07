import {useState, useMemo} from 'react';
import {Texture as PicimoTexture, TextureAtlas, Logger} from 'picimo';
import {TextureActionType, SetTexture, setTextureAtlas, LoadTextureAtlas, LoadTexture} from './useTexture.actions';
import {reducer} from './useTexture.reducer';
import {createInitialState} from './useTexture.state';

const log = new Logger('picimo-r3f.useTextureContext', 0, Infinity);

export const useTextureContext = () => {

  // TODO what about parent context?
  const [state, setState] = useState(createInitialState());

  const dispatch = useMemo(
    () => (name: string, isTextureAtlas: boolean) => (tex: Promise<PicimoTexture|TextureAtlas>|PicimoTexture|TextureAtlas) => {

    const dispatchAction = (action: TextureActionType) => {
      const nextState = reducer(state, action);
      if (nextState !== state) {
        log.log('next state', nextState);
        setState(nextState);
      } else {
        log.log('state has not been changed', state);
      }
    };

    let action: TextureActionType;

    if (tex instanceof PicimoTexture) {
      action = SetTexture(name, tex);
    } else if (tex instanceof TextureAtlas) {
      action = setTextureAtlas(name, tex);
    } else if (tex instanceof Promise) {
      if (isTextureAtlas) {
        action = LoadTextureAtlas(name, tex as Promise<TextureAtlas>, dispatchAction);
      } else {
        action = LoadTexture(name, tex as Promise<PicimoTexture>, dispatchAction);
      }
    }

    if (action) {
      log.log('dispatch', action);
      dispatchAction(action);
    } else {
      log.log('no action to dispatch :-(', {name, isTextureAtlas, tex});
    }

    return tex;
  }, [
    state, setState,
  ]);

  return {
    state,
    dispatch,
  };
}
