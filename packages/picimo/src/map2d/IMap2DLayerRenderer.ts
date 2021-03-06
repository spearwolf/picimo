import {Map2DViewTile} from './Map2DViewTile';

export interface IMap2DLayerRenderer {
  setViewOffset(x: number, y: number, depth: number): void;

  addViewTile(tile: Map2DViewTile): void;
  renderViewTile(tile: Map2DViewTile): void;
  removeViewTile(tileId: string): void;
}
