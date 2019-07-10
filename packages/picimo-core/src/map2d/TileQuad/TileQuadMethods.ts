import { ITileQuad } from './ITileQuad';

export const TileQuadMethods = {

  setTexCoordsByTexture(this: ITileQuad, { minS, minT, maxS, maxT }: { minS: number, minT: number, maxS: number, maxT: number }) {
    this.setTex(minS, minT, maxS - minS, maxT - minT);
  },

  setSize(this: ITileQuad, w: number, h: number) {
    this.width = w;
    this.height = h;
  },

  translate(this: ITileQuad, left: number, top: number, y: number) {
    this.left = left;
    this.top = top;
    this.y = y;
  },

};

export type TileQuadMethodsType = typeof TileQuadMethods;
