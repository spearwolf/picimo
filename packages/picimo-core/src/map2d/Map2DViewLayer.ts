import { IMap2DLayerData } from './IMap2DLayerData';
import { IMap2DLayerRenderer } from './IMap2DLayerRenderer';
import { Map2DView } from './Map2DView';
import { Map2DViewTile } from './Map2DViewTile';

const $createTile = Symbol('createTile');

const takeFrom = (tiles: Map2DViewTile[], left: number, top: number): Map2DViewTile => {
  const idx = tiles.findIndex((tile) => tile.isLayerTilePosition(left, top));
  if (idx !== -1) {
    return tiles.splice(idx, 1)[0];
  }
  return null;
};

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

  tiles: Map2DViewTile[] = [];

  constructor(
    view: Map2DView,
    layerRenderer: IMap2DLayerRenderer,
    layerData: IMap2DLayerData,
  ) {
    this.view = view;
    this.layerRenderer = layerRenderer;
    this.layerData = layerData;

    this.tileColumns = Math.ceil(view.layerTileWidth / layerData.tileWidth);
    this.tileRows = Math.ceil(view.layerTileHeight / layerData.tileHeight);
    this.tileWidth = this.tileColumns * layerData.tileWidth;
    this.tileHeight = this.tileRows * layerData.tileHeight;
  }

  /**
   * Create, update or delete the tiles dependent of their visibility.
   * You should call this only once per frame.
   */
  update() {
    // I. create visible map tiles (and remove/dispose unvisible)
    // ---------------------------------------------------------------

    const viewHalfWidth = this.view.width * 0.5;
    const viewHalfHeight = this.view.height * 0.5;

    const left = Math.floor((this.view.centerX - viewHalfWidth) / this.tileWidth);
    const top = Math.floor((this.view.centerY - viewHalfHeight) / this.tileHeight);
    const right = Math.ceil((this.view.centerX + viewHalfWidth) / this.tileWidth);
    const bottom = Math.ceil((this.view.centerY + viewHalfHeight) / this.tileHeight);

    const width = right - left;
    const height = bottom - top;

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

    // II. create geometries for all *new* map tiles
    // -------------------------------------------------

    const newTiles: Map2DViewTile[] = newTileCoords.map(([x, y]: number[]): Map2DViewTile => {
      const prevTile = reuseTiles.shift();
      if (prevTile) {
        removeTiles.push(prevTile.id);
      }
      return this[$createTile](x, y, prevTile);
    });

    // III. render visible tiles
    // -------------------------------

    this.tiles = knownTiles.concat(newTiles);
    this.tiles.forEach((tile) => {
      tile.fetchTileIds();
      this.layerRenderer.renderViewTile(tile);
    });

    // IV. remove unused tiles
    // -----------------------------

    removeTiles = removeTiles.concat(reuseTiles.map((tile) => tile.id));
    removeTiles.forEach((tile) => this.layerRenderer.removeViewTile(tile));
  }

  private [$createTile](x: number, y: number, reuseTile?: Map2DViewTile) {
    const tile = reuseTile || new Map2DViewTile(this.layerData, this.tileColumns, this.tileRows);
    tile.setLayerTilePosition(x, y);
    tile.setPosition(x * this.tileColumns, y * this.tileRows);
    tile.setViewOffset(x * this.tileWidth, y * this.tileHeight);
    this.layerRenderer.addViewTile(tile);
    return tile;
  }
}
