import { SpriteGroupTextured, VOIndices, SpriteGroupTexturedOptions } from '../../sprites';
import { Texture, TextureLibrary } from '../../textures';

import { Map2DViewTile } from '../Map2DViewTile';

import { ITileQuad } from './ITileQuad';
import { TileQuadMethodsType } from './TileQuadMethods';
import { getTileQuadDescriptor, TileQuadVertexObject } from './TileQuadDescriptor';

export interface ITileQuadGroupOptions extends SpriteGroupTexturedOptions<TileQuadMethodsType, ITileQuad> {
}

export class TileQuadGroup extends SpriteGroupTextured<TileQuadMethodsType, ITileQuad> {

  constructor(options?: ITileQuadGroupOptions) {
    super(getTileQuadDescriptor(), Object.assign({

      indices: VOIndices.buildQuads,

      dynamic: true,
      autotouch: false,

      setSize: (sprite: TileQuadVertexObject, w: number, h: number) => sprite.setSize(w, h),
      setTexCoordsByTexture: (sprite: TileQuadVertexObject, texture: Texture) => sprite.setTexCoordsByTexture(texture),

    }, options));
  }

  showTiles(viewTile: Map2DViewTile, textureLibrary: TextureLibrary) {

    this.voPool.freeAll();

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

      let x = viewOffsetX;

      for (let col = 0; col < tileCols; ++col) {

        const z = viewHeight - y - tileHeight;

        const tileId = viewTile.getTileIdAt(col, tileRows - row - 1);
        if (tileId > 0) {

          const texture = textureLibrary.getTextureById(tileId);
          const tile = this.voPool.alloc();

          tile.setSize(tileWidth, tileHeight);
          tile.setTexCoordsByTexture(texture);
          tile.translate(x, z, 0);

        }

        x += tileWidth;
      }
      y += tileHeight;
    }

    this.touchVertexBuffers();

  }

}
