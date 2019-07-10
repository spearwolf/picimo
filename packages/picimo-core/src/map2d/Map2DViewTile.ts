import { IMap2DLayerData } from './IMap2DLayerData';

const $top = Symbol('top');
const $left = Symbol('left');

/**
 * Represents a 2d section (a *tile*) of a [[Map2DViewLayer]].
 *
 * Internally these *view layer tiles* are organized as a grid of *sub tiles*
 * which are defined by an id (see [[IMap2DLayerData]]).
 *
 * The instances of this class are reused among the [[Map2DViewLayer]].
 *
 * The unit of measurement are *tiles* unless otherwise stated.
 *
 * Special care must be taken that the interally map2d coordinates are 2-dimensional
 * where the origin (0, 0) is on the top left corner.
 */
export class Map2DViewTile {

  readonly layerData: IMap2DLayerData;

  readonly width: number;
  readonly height: number;

  readonly tileIds: Uint32Array;

  tileIdsNeedsUpdate: boolean = true;

  layerTileLeft: number;
  layerTileTop: number;

  /**
   * Uppler left view position offset in *pixels*
   */
  viewOffsetX: number;

  /**
   * Uppler left view position offset in *pixels*
   */
  viewOffsetY: number;

  private [$top]: number = 0;
  private [$left]: number = 0;

  constructor(layerData: IMap2DLayerData, width: number, height: number) {
    this.layerData = layerData;

    this.width = width;
    this.height = height;

    this.tileIds = new Uint32Array(width * height);
  }

  get id() {
    return `${this.left},${this.top}|${this.width}x${this.height}|${this.layerData.name}|M2DGT`;
  }

  /**
   * View dimension in *pixels*
   */
  get viewWidth() { return this.layerData.tileWidth * this.width; }

  /**
   * View dimension in *pixels*
   */
  get viewHeight() { return this.layerData.tileHeight * this.height; }

  getTileIdAt(x: number, y: number) {
    return this.tileIds[x + (y * this.width)];
  }

  setLayerTilePosition(left: number, top: number) {
    this.layerTileLeft = left;
    this.layerTileTop = top;
  }

  isLayerTilePosition(left: number, top: number) {
    return this.layerTileLeft === left && this.layerTileTop === top;
  }

  setViewOffset(x: number, y: number) {
    this.viewOffsetX = x;
    this.viewOffsetY = y;
  }

  set top(top: number) {
    if (this[$top] !== top) {
      this[$top] = top;
      this.tileIdsNeedsUpdate = true;
    }
  }

  get top(): number { return this[$top]; }

  set left(left: number) {
    if (this[$left] !== left) {
      this[$left] = left;
      this.tileIdsNeedsUpdate = true;
    }
  }

  get left(): number { return this[$left]; }

  setPosition(left: number, top: number) {
    if (this[$top] !== top || this[$left] !== left) {
      this[$top] = top;
      this[$left] = left;
      this.tileIdsNeedsUpdate = true;
    }
    return this;
  }

  fetchTileIds() {
    if (this.tileIdsNeedsUpdate) {
      this.layerData.getTileIdsWithin(this[$left], this[$top], this.width, this.height, this.tileIds);
      this.tileIdsNeedsUpdate = false;
    }
    return this;
  }
}
