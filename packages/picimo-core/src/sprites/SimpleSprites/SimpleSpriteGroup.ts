import { Texture } from '../../textures';

import { SpriteGroupTextured, SpriteGroupTexturedOptions } from '../SpriteGroupTextured';
import { VOIndices } from '../VOIndices';

import { ISimpleSprite } from './ISimpleSprite';
import { SimpleSpriteMethodsType } from './SimpleSpriteMethods';
import { getSimpleSpriteDescriptor, SimpleSpriteVertexObject } from './SimpleSpriteDescriptor';

export interface ISimpleSpriteGroupOptions extends SpriteGroupTexturedOptions<SimpleSpriteMethodsType, ISimpleSprite> {
}

export class SimpleSpriteGroup extends SpriteGroupTextured<SimpleSpriteMethodsType, ISimpleSprite> {

  constructor(options?: ISimpleSpriteGroupOptions) {
    super(getSimpleSpriteDescriptor(), Object.assign({

      indices: VOIndices.buildQuads,

      dynamic: true,
      autotouch: false,

      setSize: (sprite: SimpleSpriteVertexObject, w: number, h: number) => sprite.setSize(w, h),
      setTexCoordsByTexture: (sprite: SimpleSpriteVertexObject, texture: Texture) => sprite.setTexCoordsByTexture(texture),

    }, options));
  }

}
