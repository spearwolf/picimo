import { SpriteGroup, SpriteGroupOptions } from '../SpriteGroup';
import { VOIndices } from '../VOIndices';

import { IAdvancedSpriteBase } from './IAdvancedSpriteBase';
import { AdvancedSpriteBaseMethodsType } from './AdvancedSpriteBaseMethods';
import { getAdvancedSpriteBaseDescriptor, AdvancedSpriteBaseVertexObject } from './AdvancedSpriteBaseDescriptor';

export interface IAdvancedSpriteBaseGroupOptions extends SpriteGroupOptions<AdvancedSpriteBaseMethodsType, IAdvancedSpriteBase> {
}

export class AdvancedSpriteBaseGroup extends SpriteGroup<AdvancedSpriteBaseMethodsType, IAdvancedSpriteBase> {

  constructor(options?: IAdvancedSpriteBaseGroupOptions) {
    super(getAdvancedSpriteBaseDescriptor(), Object.assign({

      indices: VOIndices.buildQuads,

      dynamic: false,

      setSize: (sprite: AdvancedSpriteBaseVertexObject, w: number, h: number) => sprite.setSize(w, h),

    }, options));
  }

}

export const getAdvancedSpriteBaseGroup = (() => {

  let baseSprites: AdvancedSpriteBaseGroup = null;

  return () => {
    if (baseSprites === null) {

      baseSprites = new AdvancedSpriteBaseGroup({ capacity: 1, dynamic: false });

      baseSprites.createSprite(1, 1).setUv(0, 1, 1, 1, 1, 0, 0, 0);

    }
    return baseSprites;
  };
})();
