import { ITileQuadBase } from './ITileQuadBase';

export const TileQuadBaseMethods = {

  setSize(this: ITileQuadBase, w: number, h: number) {
    this.setPosition(
      0, h,
      w, h,
      w, 0,
      0, 0,
    );
  },

};

export type TileQuadBaseMethodsType = typeof TileQuadBaseMethods;
