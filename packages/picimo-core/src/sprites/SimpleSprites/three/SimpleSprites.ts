import { SpriteGroupMesh, SpriteGroupInstancedBufferGeometry } from '../../three';

import { getSimpleSpriteBaseGroup } from '../SimpleSpriteBaseGroup';
import { ISimpleSprite } from '../ISimpleSprite';
import { ISimpleSpriteBase } from '../ISimpleSpriteBase';
import { SimpleSpriteBaseMethodsType } from '../SimpleSpriteBaseMethods';
import { SimpleSpriteGroup, ISimpleSpriteGroupOptions } from '../SimpleSpriteGroup';
import { SimpleSpriteMethodsType } from '../SimpleSpriteMethods';
import { Material } from 'three';

export interface ISimpleSpritesOptions extends ISimpleSpriteGroupOptions {
}

/**
 * The simple sprites are rendered on the x/z plane (on the ground).
 */
export class SimpleSprites extends SpriteGroupMesh<SimpleSpriteMethodsType, ISimpleSprite, SimpleSpriteBaseMethodsType, ISimpleSpriteBase> {

  sprites: SimpleSpriteGroup;

  constructor(material: Material, options?: ISimpleSpritesOptions) {

    const sprites = new SimpleSpriteGroup(options);
    const geometry = new SpriteGroupInstancedBufferGeometry(getSimpleSpriteBaseGroup(), sprites);

    super(geometry, material);

    this.sprites = sprites;

    this.type = 'SimpleSprites';

  }

}
