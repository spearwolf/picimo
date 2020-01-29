import {useContext, useMemo} from 'react';
import {TextureContext} from './useTexture.context';
import {getTextureAtlas, getThreeTexture} from './useTexture.state';

export const useTexture = (name: string, option?: { textureAtlas: boolean }) => {

  // TODO what about parent context?
  const {state, dispatch} = useContext(TextureContext);

  const isTextureAtlas = Boolean(option?.textureAtlas);

  const texture = useMemo(
    () => (isTextureAtlas ? getTextureAtlas(state, name) : getThreeTexture(state, name)),
    [state, name, isTextureAtlas]
  );

  const textureSetter = useMemo(
    () => dispatch(name, isTextureAtlas),
    [dispatch, name, isTextureAtlas]
  );

  return [
    texture,
    textureSetter,
  ];
}
