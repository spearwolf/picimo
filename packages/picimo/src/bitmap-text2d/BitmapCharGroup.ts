import {SpriteGroupTextured, VOIndices} from '../sprites';
import {Texture} from '../textures';

import {BitmapChar} from './BitmapChar';
import {
  getBitmapCharDescriptor,
  BitmapCharVertexObject,
} from './BitmapCharDescriptor';
import {BitmapCharMethodsType} from './BitmapCharMethods';

export interface BitmapCharGroupOptions {
  capacity?: number;

  dynamic?: boolean;
}

export class BitmapCharGroup extends SpriteGroupTextured<
  BitmapCharMethodsType,
  BitmapChar
> {
  constructor(options?: BitmapCharGroupOptions) {
    super(getBitmapCharDescriptor(), {
      indices: VOIndices.buildQuads,

      dynamic: true,

      setSize: (sprite: BitmapCharVertexObject, w: number, h: number) =>
        sprite.setSize(w, h),
      setTexCoordsByTexture: (
        sprite: BitmapCharVertexObject,
        texture: Texture,
      ) => sprite.setTexCoordsByTexture(texture),
      ...options,
    });
  }
}
