import { Texture } from '../../textures';
import { ISimpleSprite } from './ISimpleSprite';

export const SimpleSpriteMethods = {

  setTexCoordsByTexture(this: ISimpleSprite, { minS, minT, maxS, maxT }: Texture) {
    this.setTex(minS, minT, maxS - minS, maxT - minT);
  },

  setSize(this: ISimpleSprite, w: number, h: number) {
    this.width = w;
    this.height = h;
  },

  translate(this: ISimpleSprite, left: number, top: number, y: number) {
    this.left = left;
    this.top = top;
    this.y = y;
  },

};

export type SimpleSpriteMethodsType = typeof SimpleSpriteMethods;
