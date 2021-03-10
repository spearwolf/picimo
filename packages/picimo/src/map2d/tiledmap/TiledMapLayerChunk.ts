import {AABB2, base64toUint32Arr} from '../../utils';

import {ITiledMapLayerChunkData} from './ITiledMapLayerChunkData';

// TODO support compression: "zlib"
// - https://github.com/imaya/zlib.js
// - https://github.com/nodeca/pako

export class TiledMapLayerChunk {
  readonly aabb: AABB2;

  readonly #data: ITiledMapLayerChunkData;

  #cachedUint32Array: Uint32Array = null;

  constructor(data: ITiledMapLayerChunkData) {
    this.#data = data;
    this.aabb = new AABB2(data.x, data.y, data.width, data.height);
  }

  get rawData(): string {
    const {compression, data} = this.#data;
    if (compression) {
      // TODO support compression
      return null;
    }
    return data;
  }

  get uint32Arr(): Uint32Array {
    if (this.#cachedUint32Array === null) {
      // TODO support compression
      this.#cachedUint32Array = base64toUint32Arr(this.rawData);
    }
    return this.#cachedUint32Array;
  }

  get left(): number {
    return this.aabb.left;
  }

  get top(): number {
    return this.aabb.top;
  }

  get right(): number {
    return this.aabb.right;
  }

  get bottom(): number {
    return this.aabb.bottom;
  }

  getLocalTileIdAt(x: number, y: number): number {
    return this.uint32Arr[y * this.#data.width + x];
  }

  getTileIdAt(x: number, y: number): number {
    return this.getLocalTileIdAt(x - this.left, y - this.top);
  }

  containsTileIdAt(x: number, y: number): boolean {
    return this.aabb.isInside(x, y);
  }

  isIntersecting(aabb: AABB2): boolean {
    return this.aabb.isIntersecting(aabb);
  }
}
