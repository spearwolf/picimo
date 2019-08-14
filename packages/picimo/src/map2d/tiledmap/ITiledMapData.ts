import { ITiledMapLayerData } from './ITiledMapLayerData';
import { ITiledTilesetData } from './ITiledTilesetData';

export interface ITiledMapData {
  height: number;
  infinite: boolean;
  layers: ITiledMapLayerData[];
  nextobjectid: number;
  orientation: string;
  renderorder: string;
  tileheight: number;
  tilesets: ITiledTilesetData[];
  tilewidth: number;
  type: string;
  version: number;
  width: number;
}
