import { BitmapCharBase } from './BitmapCharBase';

export const BitmapCharBaseMethods = {

  setSize(this: BitmapCharBase, w: number, h: number) {
    this.setPosition(
      0, h,
      w, h,
      w, 0,
      0, 0,
    );
  },

};

export type BitmapCharBaseMethodsType = typeof BitmapCharBaseMethods;
