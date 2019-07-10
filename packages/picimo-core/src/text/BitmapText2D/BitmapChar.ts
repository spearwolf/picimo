
export interface BitmapChar {

  zPos: number;

  baselineOffset: number;

  originX: number;
  originY: number;

  width: number;
  height: number;

  setPos: (oiginX: number, originY: number, width: number, height: number) => void;

  originS: number;
  originT: number;

  maxS: number;
  maxT: number;

  setTex: (oiginS: number, originT: number, maxS: number, maxT: number) => void;

}
