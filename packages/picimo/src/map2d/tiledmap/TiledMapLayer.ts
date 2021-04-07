import {TileSet} from '../../textures';
import {AABB2, Logger, PICIMO_DEV} from '../../utils';

import {IMap2DLayerData, IViewCullingThreshold} from '../IMap2DLayerData';

import {ChunkQuadTreeNode} from './ChunkQuadTreeNode';
import {ITiledMapLayerChunkData} from './ITiledMapLayerChunkData';
import {ITiledMapLayerData} from './ITiledMapLayerData';
import {TiledMap} from './TiledMap';
import {TiledMapCustomProperties} from './TiledMapCustomProperties';
import {TiledMapLayerChunk} from './TiledMapLayerChunk';

const $tiledMap = Symbol('tiledMap');
const $data = Symbol('data');
const $rootNode = Symbol('rootNode');
// const $props = Symbol('props');

const findChunk = (
  chunks: TiledMapLayerChunk[],
  x: number,
  y: number,
): TiledMapLayerChunk => {
  return chunks.find((chunk: TiledMapLayerChunk) =>
    chunk.containsTileIdAt(x, y),
  );
};

const log = new Logger('picimo.TiledMapLayer');

/**
 * Represents a specific layer of a TiledMap.
 */
export class TiledMapLayer implements IMap2DLayerData {
  viewCullingThreshold: IViewCullingThreshold = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  yOffset: number; // optional

  includeTilesets: string[]; // optional

  private readonly [$tiledMap]: TiledMap;
  private readonly [$data]: ITiledMapLayerData;
  private readonly [$rootNode]: ChunkQuadTreeNode;
  // private readonly [$props]: TiledMapCustomProperties;

  constructor(
    tiledMap: TiledMap,
    data: ITiledMapLayerData,
    autoSubdivide = true,
  ) {
    this[$tiledMap] = tiledMap;
    this[$data] = data;

    const props = new TiledMapCustomProperties(data.properties || []);
    // this[$props] = props;

    const vct = props.valueAsCssShorthandInt4('viewCullingThreshold');
    if (vct) {
      this.viewCullingThreshold.top = vct[0];
      this.viewCullingThreshold.right = vct[1];
      this.viewCullingThreshold.bottom = vct[2];
      this.viewCullingThreshold.left = vct[3];
    }

    this.yOffset = parseInt(props.value('yOffset'), 10);

    this.includeTilesets = props.valueAsCSLofStrings('includeTilesets');

    if (PICIMO_DEV) {
      log.debug('create TiledMapLayer', this, data);
    }

    if (tiledMap.infinite) {
      const chunks: TiledMapLayerChunk[] = data.chunks.map(
        (chunkData: ITiledMapLayerChunkData) =>
          new TiledMapLayerChunk(chunkData),
      );
      this[$rootNode] = new ChunkQuadTreeNode(chunks);

      if (autoSubdivide) {
        this.subdivide();
      }
    } else {
      this[$rootNode] = new ChunkQuadTreeNode(
        new TiledMapLayerChunk(data as ITiledMapLayerChunkData),
      );
    }
  }

  /**
   * Filter the list of tilesets based on the `.includeTilesets` property.
   * If the property has been defined, all items in it are interpreted
   * as regular expression and matched against the tileset name.
   * If the tileset has no name, it still will be considered a hit
   * regardless of what is defined in the `.includeTilesets` property.
   * If the property is not defined, the list of tilesets is returned unfiltered.
   *
   * @returns list of tilesets or `undefined` if there is no match
   */
  filterTilesets(tilesets: TileSet[]): TileSet[] {
    if (!this.includeTilesets || this.includeTilesets.length === 0) {
      return tilesets;
    }
    const res = tilesets.filter((tileset) => {
      if (tileset.name) {
        let found = false;
        for (let i = 0; i < this.includeTilesets.length; i++) {
          if (new RegExp(this.includeTilesets[i]).exec(tileset.name)) {
            found = true;
            break;
          }
        }
        return found;
      }
      return true;
    });
    if (res.length) {
      return res;
    }
  }

  get name() {
    return this[$data].name;
  }

  get tileWidth() {
    return this[$tiledMap].tilewidth;
  }
  get tileHeight() {
    return this[$tiledMap].tileheight;
  }

  get visible() {
    return this[$data].visible;
  }

  get type() {
    return this[$data].type;
  }

  subdivide(maxChunkPerNodes = 2) {
    this[$rootNode].subdivide(maxChunkPerNodes);
  }

  getTileIdsWithin(
    left: number,
    top: number,
    width: number,
    height: number,
    uint32arr?: Uint32Array,
  ): Uint32Array {
    const arr = uint32arr || new Uint32Array(width * height);
    const chunks = this[$rootNode].findVisibleChunks(
      new AABB2(left, top, width, height),
    );

    let curChunk: TiledMapLayerChunk = null;
    for (let offsetY = 0; offsetY < height; offsetY++) {
      for (let offsetX = 0; offsetX < width; offsetX++) {
        const x = left + offsetX;
        const y = top + offsetY;
        if (!curChunk || !curChunk.containsTileIdAt(x, y)) {
          curChunk = findChunk(chunks, x, y);
        }
        arr[offsetY * width + offsetX] = curChunk
          ? curChunk.getTileIdAt(x, y)
          : 0;
      }
    }
    return arr;
  }
}
