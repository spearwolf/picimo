import {Texture as PicimoTexture} from 'picimo';
import {Texture as ThreeTexture, NearestFilter} from 'three';

export const makeThreeTexture = (picimoTexture: PicimoTexture) => {
  const texture = new ThreeTexture(picimoTexture.imgEl);
  texture.flipY = false;
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.needsUpdate = true;
  return texture;
};
