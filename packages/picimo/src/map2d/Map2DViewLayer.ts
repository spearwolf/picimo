import {Logger} from '../utils';

import {IMap2DLayerData} from './IMap2DLayerData';
import {IMap2DLayerRenderer} from './IMap2DLayerRenderer';
import {Map2DView} from './Map2DView';
import {Map2DViewTile} from './Map2DViewTile';

const $createTile = Symbol('createTile');

const takeFrom = (
  tiles: Map2DViewTile[],
  left: number,
  top: number,
): Map2DViewTile => {
  const idx = tiles.findIndex((tile) => tile.isLayerTilePosition(left, top));
  if (idx !== -1) {
    return tiles.splice(idx, 1)[0];
  }
  return null;
};

const log = new Logger('picimo.Map2DViewLayer');

/**
 * Represents a single layer of a [[Map2DView]].
 * Internally the layer is organized as a grid of tiles (see [[Map2DViewTile]]).
 * The layer is responsible for the lifecycle of the tiles dependent on their visibility
 * which is defined by [[Map2DView]].
 */
export class Map2DViewLayer {
  readonly view: Map2DView;

  readonly layerRenderer: IMap2DLayerRenderer;
  readonly layerData: IMap2DLayerData;

  readonly tileColumns: number;
  readonly tileRows: number;
  readonly tileWidth: number;
  readonly tileHeight: number;

  viewOffsetX: number;
  viewOffsetY: number;
  viewOffsetDepth: number;

  tiles: Map2DViewTile[] = [];

  constructor(
    view: Map2DView,
    layerRenderer: IMap2DLayerRenderer,
    layerData: IMap2DLayerData,
    [viewOffsetX, viewOffsetY, viewOffsetDepth] = [0, 0, 0],
  ) {
    this.view = view;

    this.layerRenderer = layerRenderer;
    this.layerData = layerData;

    this.setViewOffset(viewOffsetX, viewOffsetY, viewOffsetDepth);

    // TODO use an optional and initial zoom here?
    this.tileColumns = Math.ceil(view.layerTileWidth / layerData.tileWidth);
    this.tileRows = Math.ceil(view.layerTileHeight / layerData.tileHeight);
    this.tileWidth = this.tileColumns * layerData.tileWidth;
    this.tileHeight = this.tileRows * layerData.tileHeight;

    if (log.VERBOSE) {
      log.log('created Map2DViewLayer', this);
    }
  }

  setViewOffset(
    viewOffsetX: number,
    viewOffsetY: number,
    viewOffsetDepth: number = this.viewOffsetDepth,
  ): void {
    this.viewOffsetX = viewOffsetX;
    this.viewOffsetY = viewOffsetY;
    this.viewOffsetDepth = viewOffsetDepth;
    this.layerRenderer.setViewOffset(viewOffsetX, viewOffsetY, viewOffsetDepth);
  }

  /**
   * Create, update or delete the tiles dependent of their visibility.
   * You should call this only once per frame.
   */
  update(): void {
    // -------------------------------------------------------------------
    // The first step is to find the visible area on the layer plane
    // -------------------------------------------------------------------

    const {view, viewOffsetDepth} = this;

    const zoom = view.projection.getZoom(viewOffsetDepth);

    const viewHalfWidth = view.width * zoom * 0.5;
    const viewHalfHeight = view.height * zoom * 0.5;

    const {viewCullingThreshold} = this.layerData;

    const viewCenterX = view.centerX - this.viewOffsetX;
    const viewCenterY = view.centerY - this.viewOffsetY;

    const left = Math.floor(
      (viewCenterX - viewHalfWidth - viewCullingThreshold.left) /
        this.tileWidth,
    );
    const top = Math.floor(
      (viewCenterY - viewHalfHeight - viewCullingThreshold.top) /
        this.tileHeight,
    );
    const right = Math.ceil(
      (viewCenterX + viewHalfWidth + viewCullingThreshold.right) /
        this.tileWidth,
    );
    const bottom = Math.ceil(
      (viewCenterY + viewHalfHeight + viewCullingThreshold.bottom) /
        this.tileHeight,
    );

    const width = right - left;
    const height = bottom - top;

    // At this point we know the visible area.
    // It is defined by [left,top,right,bottom] and [width,height]
    // We are now also in the *tiles* coordinate system.

    // -------------------------------------------------------------------
    // Next we *rasterize* the visible area:
    //
    // - if there are tiles in the grid that are already in use,
    //   they can easily be displayed again (-> knownTiles)
    //
    // - all new tile coordinates for which no tile has been created yet
    //   will be saved for later (-> newTileCoords)
    //
    // - all other previously used tiles are left over - they are
    //   no longer visible and can be recycled (-> resueTiles)
    //
    // -------------------------------------------------------------------

    const reuseTiles = this.tiles.slice(0);
    const knownTiles: Map2DViewTile[] = [];
    const newTileCoords: number[][] = [];
    let removeTiles: string[] = [];

    for (let yOffset = 0; yOffset < height; ++yOffset) {
      for (let xOffset = 0; xOffset < width; ++xOffset) {
        const x = left + xOffset;
        const y = top + yOffset;
        const tile = takeFrom(reuseTiles, x, y);
        if (tile) {
          knownTiles.push(tile);
        } else {
          newTileCoords.push([x, y]);
        }
      }
    }

    // ------------------------------------------------------------
    // Create now all new tiles which were not available before
    //
    // The ID's of all recycled tiles are stored temporarily
    // so that the layer can clean them up later (-> removeTiles)
    // ------------------------------------------------------------

    const newTiles: Map2DViewTile[] = newTileCoords.map(
      ([x, y]: number[]): Map2DViewTile => {
        const prevTile = reuseTiles.shift();
        if (prevTile) {
          removeTiles.push(prevTile.id);
        }
        return this[$createTile](x, y, prevTile);
      },
    );

    // ------------------------------------------------------------
    // All visible tiles are created and can be displayed now
    // ------------------------------------------------------------

    this.tiles = knownTiles.concat(newTiles);
    this.tiles.forEach((tile) => {
      tile.fetchTileIds();
      this.layerRenderer.renderViewTile(tile);
    });

    // -----------------------------------------------------------------------------
    // Last but not least we tell the layer which tile ID's are no longer needed
    // and can therefore should be deleted
    // -----------------------------------------------------------------------------

    removeTiles = removeTiles.concat(reuseTiles.map((tile) => tile.id));
    removeTiles.forEach((tile) => this.layerRenderer.removeViewTile(tile));
  }

  private [$createTile](x: number, y: number, reuseTile?: Map2DViewTile) {
    const tile =
      reuseTile ||
      new Map2DViewTile(this.layerData, this.tileColumns, this.tileRows);
    tile.setLayerTilePosition(x, y);
    tile.setPosition(x * this.tileColumns, y * this.tileRows);
    tile.setViewOffset(x * this.tileWidth, y * this.tileHeight);
    this.layerRenderer.addViewTile(tile);
    return tile;
  }
}
