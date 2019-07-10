import * as THREE from 'three';

import { TextureLibrary } from '../../textures';

import { Map2DViewTile } from '../Map2DViewTile';

export class Map2DTileBufferGeometry extends THREE.BufferGeometry {
  readonly type: string = 'Map2DTileBufferGeometry';

  constructor(viewTile: Map2DViewTile, textureLibrary: TextureLibrary) {
    super();

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

    const vertices = [];
    const normals = [];
    const uvs = [];

    const up = new THREE.Vector3(0, 1, 0);

    viewTile.fetchTileIds();

    let y = -viewOffsetY;

    for (let row = 0; row < tileRows; ++row) {

      let x = viewOffsetX;

      for (let col = 0; col < tileCols; ++col) {

        // the internal map2d (x,y) coordinates are mapped to the 3d coordinates (x, 0, y)

        const z = viewHeight - y - tileHeight;
        const z1 = viewHeight - y
        const x1 = x + tileWidth;

        vertices.push(x, 0, z);
        vertices.push(x, 0, z1);
        vertices.push(x1, 0, z);
        vertices.push(x, 0, z1);
        vertices.push(x1, 0, z1);
        vertices.push(x1, 0, z);

        normals.push(up.x, up.y, up.z);
        normals.push(up.x, up.y, up.z);
        normals.push(up.x, up.y, up.z);
        normals.push(up.x, up.y, up.z);
        normals.push(up.x, up.y, up.z);
        normals.push(up.x, up.y, up.z);

        const tileId = viewTile.getTileIdAt(col, tileRows - row - 1);
        const texture = textureLibrary.getTextureById(tileId);

        if (texture) {
          const { minS, minT, maxS, maxT } = texture;

          uvs.push(minS, minT);
          uvs.push(minS, maxT);
          uvs.push(maxS, minT);
          uvs.push(minS, maxT);
          uvs.push(maxS, maxT);
          uvs.push(maxS, minT);

        } else {
          uvs.push(0, 1);
          uvs.push(0, 0);
          uvs.push(1, 1);
          uvs.push(0, 0);
          uvs.push(1, 0);
          uvs.push(1, 1);
        }

        x += tileWidth;
      }
      y += tileHeight;
    }

    this.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    this.addAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    this.addAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  }
}
