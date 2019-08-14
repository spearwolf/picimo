import { ISimpleSpriteBase } from './ISimpleSpriteBase';

export const SimpleSpriteBaseMethods = {

  setSize(this: ISimpleSpriteBase, w: number, h: number) {
    this.setPosition(
      0, h,
      w, h,
      w, 0,
      0, 0,
    );
  },

};

export type SimpleSpriteBaseMethodsType = typeof SimpleSpriteBaseMethods;
