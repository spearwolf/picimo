import { IAdvancedSpriteBase } from './IAdvancedSpriteBase';

export const AdvancedSpriteBaseMethods = {

  setSize(this: IAdvancedSpriteBase, w: number, h: number) {
    this.setPosition(
      0, h,
      w, h,
      w, 0,
      0, 0,
    );
  },

};

export type AdvancedSpriteBaseMethodsType = typeof AdvancedSpriteBaseMethods;
