import {IProjection} from '../projection';

import {IMap2DRenderer} from './IMap2DRenderer';
import {Map2DViewLayer} from './Map2DViewLayer';

const $renderer = Symbol('renderer');

/**
 * Represents a 2d section from a 2d map along the x- and y- axis.
 * A 2d map consists of one or more layers.
 *
 * The unit of measurement are *pixels* unless otherwise stated.
 *
 * Special care must be taken that the interally map2d coordinates are 2-dimensional
 * where the origin (0, 0) is on the top left corner.
 */
export class Map2DView {
  centerX: number;
  centerY: number;
  width: number;
  height: number;

  readonly projection: IProjection;

  readonly layerTileWidth: number;
  readonly layerTileHeight: number;

  readonly layers: Map2DViewLayer[] = [];

  private readonly [$renderer]: IMap2DRenderer;

  /**
   * @param centerX horizontal center position
   * @param centerY vertical center position
   * @param layerTileWidth approximate width of a *grid tile* (see [[Map2DLayerTile]]) in *pixels*. This is just a hint and the real size is a multiple of the size of a single tile which can be different for each layer.
   * @param layerTileHeight approximate height of a *grid tile* (see [[Map2DLayerTile]]) in *pixels*. This is just a hint and the real size is a multiple of the size of a single tile which can be different for each layer.
   */
  constructor(
    renderer: IMap2DRenderer,
    projection: IProjection,
    centerX = 0,
    centerY = 0,
    layerTileWidth = 512,
    layerTileHeight = 512,
  ) {
    this[$renderer] = renderer;
    this.projection = projection;
    this.centerX = centerX;
    this.centerY = centerY;
    const [viewWidth, viewHeight] = projection.getViewRect();
    this.width = viewWidth;
    this.height = viewHeight;
    this.layerTileWidth = layerTileWidth;
    this.layerTileHeight = layerTileHeight;
  }

  get left(): number {
    const halfWidth = this.width / 2;
    return this.centerX - halfWidth;
  }

  get top(): number {
    const halfHeight = this.height / 2;
    return this.centerY - halfHeight;
  }

  addLayer(layer: Map2DViewLayer): Map2DViewLayer {
    this.layers.push(layer);
    return layer;
  }

  setOrigin(centerX: number, centerY: number): void {
    this.centerX = centerX;
    this.centerY = centerY;
  }

  setDimension(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  update(width?: number, height?: number): void {
    if (width == null || height == null) {
      const [viewWidth, viewHeight] = this.projection.getViewRect();
      this.width = width ?? viewWidth;
      this.height = height ?? viewHeight;
    } else {
      this.width = width;
      this.height = height;
    }

    const renderer = this[$renderer];
    renderer.setOrigin(-this.centerX, -this.centerY);

    renderer.beginRender(this);
    this.layers.forEach((layer) => layer.update());
    renderer.endRender(this);
  }
}
