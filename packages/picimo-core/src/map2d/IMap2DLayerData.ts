
export interface IViewCullingThreshold {
  top: number,
  right: number,
  bottom: number,
  left: number;
}

export interface IMap2DLayerData {

  /**
   * The layer name
   */
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
   * The view culling threshold.
   * In the vast majority of cases the value `{top:0, right: 0, bottom: 0, left: 0}` should be sufficient here.
   */
  viewCullingThreshold: IViewCullingThreshold;

  /**
   * Uses a right-handed coordinate system.
   */
  getTileIdsWithin(left: number, top: number, width: number, height: number, uint32arr?: Uint32Array): Uint32Array;

}
