import { AABB2 } from '../../math';

import { IMap2DLayerData } from '../IMap2DLayerData';
import { ChunkQuadTreeNode } from './ChunkQuadTreeNode';
import { ITiledMapLayerChunkData } from './ITiledMapLayerChunkData';
import { ITiledMapLayerData } from './ITiledMapLayerData';
import { TiledMap } from './TiledMap';
import { TiledMapLayerChunk } from './TiledMapLayerChunk';

const $tiledMap = Symbol('tiledMap');
const $data = Symbol('data');
const $rootNode = Symbol('rootNode');

const findChunk = (chunks: TiledMapLayerChunk[], x: number, y: number): TiledMapLayerChunk => {
  return chunks.find((chunk: TiledMapLayerChunk) => chunk.containsTileIdAt(x, y));
};

/**
 * Represents a specific layer of a TiledMap.
 */
export class TiledMapLayer implements IMap2DLayerData {

  private readonly [$tiledMap]: TiledMap;
  private readonly [$data]: ITiledMapLayerData;
  private readonly [$rootNode]: ChunkQuadTreeNode;

  constructor(tiledMap: TiledMap, data: ITiledMapLayerData, autoSubdivide: boolean = true) {

    this[$tiledMap] = tiledMap;
    this[$data] = data;

    const chunks: TiledMapLayerChunk[] = data.chunks.map((chunkData: ITiledMapLayerChunkData) => new TiledMapLayerChunk(chunkData));
    this[$rootNode] = new ChunkQuadTreeNode(chunks);

    if (autoSubdivide) {
      this.subdivide();
    }

  }

  get name() { return this[$data].name; }

  get tileWidth() { return this[$tiledMap].tilewidth; }
  get tileHeight() { return this[$tiledMap].tileheight; }

  subdivide(maxChunkPerNodes: number = 2) {
    this[$rootNode].subdivide(maxChunkPerNodes);
  }

  getTileIdsWithin(left: number, top: number, width: number, height: number, uint32arr?: Uint32Array): Uint32Array {
    const arr = uint32arr || new Uint32Array(width * height);
    const chunks = this[$rootNode].findVisibleChunks(new AABB2(left, top, width, height));

    let curChunk: TiledMapLayerChunk = null;
    for (let offsetY = 0; offsetY < height; offsetY++) {
      for (let offsetX = 0; offsetX < width; offsetX++) {
        const x = left + offsetX;
        const y = top + offsetY;
        if (!curChunk || !curChunk.containsTileIdAt(x, y)) {
          curChunk = findChunk(chunks, x, y);
        }
        arr[offsetY * width + offsetX] = curChunk ? curChunk.getTileIdAt(x, y) : 0;
      }
    }
    return arr;
  }
}
