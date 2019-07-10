import { BitmapChar } from './BitmapChar';

export const BitmapCharMethods = {

  setTexCoordsByTexture(this: BitmapChar, { minS, minT, maxS, maxT }: { minS: number, minT: number, maxS: number, maxT: number }) {
    this.setTex(minS, minT, maxS - minS, maxT - minT);
  },

  setSize(this: BitmapChar, w: number, h: number) {
    this.width = w;
    this.height = h;
  },

  translate(this: BitmapChar, x: number, y: number, z: number) {
    this.originX = x;
    this.originY = y;
    this.zPos = z;
  },

};

export type BitmapCharMethodsType = typeof BitmapCharMethods;
