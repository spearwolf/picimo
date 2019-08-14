import { SpriteGroup, SpriteGroupOptions } from '../SpriteGroup';
import { VOIndices } from '../VOIndices';

import { ISimpleSpriteBase } from './ISimpleSpriteBase';
import { SimpleSpriteBaseMethodsType } from './SimpleSpriteBaseMethods';
import { getSimpleSpriteBaseDescriptor, SimpleSpriteBaseVertexObject } from './SimpleSpriteBaseDescriptor';

export interface ISimpleSpriteBaseGroupOptions extends SpriteGroupOptions<SimpleSpriteBaseMethodsType, ISimpleSpriteBase> {
}

export class SimpleSpriteBaseGroup extends SpriteGroup<SimpleSpriteBaseMethodsType, ISimpleSpriteBase> {

  constructor(options?: ISimpleSpriteBaseGroupOptions) {
    super(getSimpleSpriteBaseDescriptor(), Object.assign({

      indices: VOIndices.buildQuads,

      dynamic: false,

      setSize: (sprite: SimpleSpriteBaseVertexObject, w: number, h: number) => sprite.setSize(w, h),

    }, options));
  }

}

export const getSimpleSpriteBaseGroup = (() => {

  let baseSprites: SimpleSpriteBaseGroup = null;

  return () => {
    if (baseSprites === null) {

      baseSprites = new SimpleSpriteBaseGroup({ capacity: 1, dynamic: false });

      baseSprites.createSprite(1, 1).setUv(0, 1, 1, 1, 1, 0, 0, 0);

    }
    return baseSprites;
  };
})();
