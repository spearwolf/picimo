import {ITileQuad} from './ITileQuad';
import {TileFlipFlags} from './TileFlipFlags';

export const TileQuadMethods = {
  /**
   * When rendering a tile, the order of operation matters.
   * The diagonal flip (x/y axis swap) is done first,
   * followed by the horizontal and vertical flips.
   *
   * @param flipFlags see [[TileFlipFlags]]
   */
  setTexCoordsByTexture(
    this: ITileQuad,
    {
      minS,
      minT,
      maxS,
      maxT,
    }: {minS: number; minT: number; maxS: number; maxT: number},
    flipFlags: number,
  ) {
    let s0: number;
    let s1: number;
    let t0: number;
    let t1: number;

    if (flipFlags & TileFlipFlags.FLIPPED_DIAGONALLY) {
      t0 = minS;
      t1 = maxS;
      s0 = minT;
      s1 = maxT;
    } else {
      s0 = minS;
      s1 = maxS;
      t0 = minT;
      t1 = maxT;
    }

    if (flipFlags & TileFlipFlags.FLIPPED_HORIZONTALLY) {
      const tmp = s1;
      s1 = s0;
      s0 = tmp;
    }

    if (flipFlags & TileFlipFlags.FLIPPED_VERTICALLY) {
      const tmp = t1;
      t1 = t0;
      t0 = tmp;
    }

    // this.setTex(minS, minT, maxS - minS, maxT - minT);
    this.setTex(s0, t0, s1 - s0, t1 - t0);
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
