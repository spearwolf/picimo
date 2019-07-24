
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
   * The horizontal view culling threshold.
   * In the vast majority of cases the tile width should be sufficient here.
   */
  viewCullingThresholdHorizontal: number;

  /**
   * The vertical view culling threshold.
   * In the vast majority of cases the tile height should be sufficient here.
   */
  viewCullingThresholdVertical: number;

  /**
   * Uses a right-handed coordinate system.
   */
  getTileIdsWithin(left: number, top: number, width: number, height: number, uint32arr?: Uint32Array): Uint32Array;
}
