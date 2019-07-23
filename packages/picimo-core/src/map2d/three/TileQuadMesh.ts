import { Material } from 'three';

import { SpriteGroupMesh, SpriteGroupInstancedBufferGeometry } from '../../sprites';

import { getTileQuadBaseGroup } from '../TileQuad/TileQuadBaseGroup';
import { ITileQuad } from '../TileQuad/ITileQuad';
import { ITileQuadBase } from '../TileQuad/ITileQuadBase';
import { TileQuadBaseMethodsType } from '../TileQuad/TileQuadBaseMethods';
import { TileQuadGroup, ITileQuadGroupOptions } from '../TileQuad/TileQuadGroup';
import { TileQuadMethodsType } from '../TileQuad/TileQuadMethods';

export interface ITileQuadMeshOptions extends ITileQuadGroupOptions {
}

export class TileQuadMesh extends SpriteGroupMesh<TileQuadMethodsType, ITileQuad, TileQuadBaseMethodsType, ITileQuadBase> {

  tiles: TileQuadGroup;

  constructor(material: Material, options?: ITileQuadMeshOptions) {

    const tiles = new TileQuadGroup({

      voNew: null,
      voZero: null,

      ...options,

    });

    const geometry = new SpriteGroupInstancedBufferGeometry(getTileQuadBaseGroup(), tiles);

    super(geometry, material);

    this.tiles = tiles;

    this.type = 'picimo.TileQuadMesh';

    this.frustumCulled = false;

  }

  /*
  updateBoundingSphere(viewTile: Map2DViewTile) {

    const {
      viewWidth,
      viewHeight,
      viewOffsetX,
      viewOffsetY,
    } = viewTile;

    // const minX = viewOffsetX;
    const minY = viewHeight + viewOffsetY;
    const maxX = viewOffsetX + viewWidth;
    const maxY = viewHeight - (-viewOffsetY + viewHeight);

    this.geometry.boundingBox = new Box3(new Vector3(viewOffsetX, minY, 0), new Vector3(maxX, maxY, 0));

  }
  */

}
