import {
  SpriteGroupTextured,
  VOIndices,
  SpriteGroupTexturedOptions,
} from '../../sprites';
import {Texture, ITileSet} from '../../textures';

import {Map2DViewTile} from '../Map2DViewTile';

import {ITileQuad} from './ITileQuad';
import {TileFlipFlags} from './TileFlipFlags';
import {
  getTileQuadDescriptor,
  TileQuadVertexObject,
} from './TileQuadDescriptor';
import {TileQuadMethodsType} from './TileQuadMethods';

export interface ITileQuadGroupOptions
  extends SpriteGroupTexturedOptions<TileQuadMethodsType, ITileQuad> {}

export class TileQuadGroup extends SpriteGroupTextured<
  TileQuadMethodsType,
  ITileQuad
> {
  constructor(options?: ITileQuadGroupOptions) {
    super(getTileQuadDescriptor(), {
      indices: VOIndices.buildQuads,

      dynamic: true,
      autotouch: false,

      setSize: (sprite: TileQuadVertexObject, w: number, h: number) =>
        sprite.setSize(w, h),
      setTexCoordsByTexture: (sprite: TileQuadVertexObject, texture: Texture) =>
        sprite.setTexCoordsByTexture(texture, 0),
      ...options,
    });
  }

  clearTiles() {
    this.voPool.freeAll();
    this.touchVertexBuffers(); // increase voPool->voArray serial
  }

  showTiles(viewTile: Map2DViewTile, tileset: ITileSet) {
    this.clearTiles();

    const {
      viewWidth,
      viewHeight,
      viewOffsetX,
      viewOffsetY,
      width: tileCols,
      height: tileRows,
    } = viewTile;

    const tileWidth = viewWidth / tileCols;
    const tileHeight = viewHeight / tileRows;

    viewTile.fetchTileIds();

    let y = -viewOffsetY;

    for (let row = 0; row < tileRows; ++row) {
      const z = viewHeight - y - tileHeight;
      const row_ = tileRows - row - 1;

      let x = viewOffsetX;

      for (let col = 0; col < tileCols; ++col) {
        let tileId = viewTile.getTileIdAt(col, row_);
        const flipFlags: number = tileId & TileFlipFlags.ALL;
        tileId = tileId & TileFlipFlags.ALL_INVERTED;

        if (tileset.hasTextureId(tileId)) {
          const texture = tileset.getTextureById(tileId);
          if (texture != null) {
            const tile = this.voPool.alloc();

            tile.setTexCoordsByTexture(texture, flipFlags);
            const {width: texWidth, height: texHeight} = texture;
            tile.setSize(texWidth, texHeight);
            tile.translate(x, z - texHeight + tileHeight, 0);
          }
        }

        x += tileWidth;
      }
      y += tileHeight;
    }
  }
}
