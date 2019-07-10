import { SpriteGroupMesh, SpriteGroupInstancedBufferGeometry } from '../../sprites';

import { getTileQuadBaseGroup } from '../TileQuad/TileQuadBaseGroup';
import { ITileQuad } from '../TileQuad/ITileQuad';
import { ITileQuadBase } from '../TileQuad/ITileQuadBase';
import { TileQuadBaseMethodsType } from '../TileQuad/TileQuadBaseMethods';
import { TileQuadGroup, ITileQuadGroupOptions } from '../TileQuad/TileQuadGroup';
import { TileQuadMaterial } from './TileQuadMaterial';
import { TileQuadMethodsType } from '../TileQuad/TileQuadMethods';

export interface ITileQuadMeshOptions extends ITileQuadGroupOptions {
}

export class TileQuadMesh extends SpriteGroupMesh<TileQuadMethodsType, ITileQuad, TileQuadBaseMethodsType, ITileQuadBase> {

  tiles: TileQuadGroup;
  material: TileQuadMaterial;

  constructor(material: TileQuadMaterial, options?: ITileQuadMeshOptions) {

    const tiles = new TileQuadGroup({

      voNew: null,
      voZero: null,

      ...options,

    });

    const geometry = new SpriteGroupInstancedBufferGeometry(getTileQuadBaseGroup(), tiles);

    super(geometry, material);

    this.tiles = tiles;
    this.material = material;

    this.type = 'TileQuadMesh';

  }

}
