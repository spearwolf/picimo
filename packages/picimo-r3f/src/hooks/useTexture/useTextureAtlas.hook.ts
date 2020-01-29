import {useTexture} from './useTexture.hook';

export const useTextureAtlas = (name: string = 'default') => useTexture(name, {textureAtlas: true});
