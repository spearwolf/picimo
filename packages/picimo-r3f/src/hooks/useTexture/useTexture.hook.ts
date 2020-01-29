import {useContext, useMemo} from 'react';
import {TextureContext} from './useTexture.context';

export const useTexture = (name: string = 'default', option?: { textureAtlas: boolean }) => {

  // TODO what about parent context?
  const {state, dispatch} = useContext(TextureContext);

  const isTextureAtlas = Boolean(option?.textureAtlas);

  const texture = useMemo(
    () => (isTextureAtlas ? state.textureAtlas[name] : state.texture[name]),
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
