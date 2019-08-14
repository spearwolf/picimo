
export interface ISimpleSprite {

  y: number;

  left: number;
  top: number;

  width: number;
  height: number;

  setPos: (left: number, top: number, width: number, height: number) => void;

  originS: number;
  originT: number;

  maxS: number;
  maxT: number;

  setTex: (oiginS: number, originT: number, maxS: number, maxT: number) => void;

}
