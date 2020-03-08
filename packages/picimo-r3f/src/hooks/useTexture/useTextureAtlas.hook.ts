import {useTexture} from './useTexture.hook';

export const useTextureAtlas = (name: string) =>
  useTexture(name, {textureAtlas: true});
