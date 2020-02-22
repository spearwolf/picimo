import {ITiledMapLayerChunkData} from './ITiledMapLayerChunkData';
import {ITiledMapCustomProperty} from './ITiledMapCustomProperty';

export interface ITiledMapLayerData {
  chunks: ITiledMapLayerChunkData[];
  encoding: string;
  height: number;
  name: string;
  type: string;
  opacity: number;
  startx: number;
  starty: number;
  visible: boolean;
  width: number;
  x: number;
  y: number;
  properties: ITiledMapCustomProperty[];
}
