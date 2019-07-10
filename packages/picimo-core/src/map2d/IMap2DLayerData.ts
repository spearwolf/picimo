
export interface IMap2DLayerData {
  name: string;

  /**
   * The width of a tile in *pixels*
   */
  tileWidth: number;

  /**
   * The height of a tile in *pixels*
   */
  tileHeight: number;

  /**
   * Uses a right-handed coordinate system.
   */
  getTileIdsWithin(left: number, top: number, width: number, height: number, uint32arr?: Uint32Array): Uint32Array;
}
