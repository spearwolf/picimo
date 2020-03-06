import {
  SpriteGroupMesh,
  SpriteGroupInstancedBufferGeometry,
} from '../../sprites';

import {ITileQuad} from './ITileQuad';
import {ITileQuadBase} from './ITileQuadBase';
import {getTileQuadBaseGroup} from './TileQuadBaseGroup';
import {TileQuadBaseMethodsType} from './TileQuadBaseMethods';
import {TileQuadGroup, ITileQuadGroupOptions} from './TileQuadGroup';
import {TileQuadMethodsType} from './TileQuadMethods';

import {Material} from 'three';

export interface ITileQuadMeshOptions extends ITileQuadGroupOptions {}

export class TileQuadMesh extends SpriteGroupMesh<
  TileQuadMethodsType,
  ITileQuad,
  TileQuadBaseMethodsType,
  ITileQuadBase
> {
  readonly picimoType: string;

  tiles: TileQuadGroup;

  constructor(material: Material, options?: ITileQuadMeshOptions) {
    const tiles = new TileQuadGroup({
      voNew: null,
      voZero: null,

      ...options,
    });

    const geometry = new SpriteGroupInstancedBufferGeometry(
      getTileQuadBaseGroup(),
      tiles,
    );

    super(geometry, material);

    this.tiles = tiles;

    this.frustumCulled = false;

    this.picimoType = 'TileQuadMesh';
  }

  /* TODO create bounding box/sphere for view culing?
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
