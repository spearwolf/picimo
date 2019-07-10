import { ITiledMapLayerChunkData } from './ITiledMapLayerChunkData';

export interface ITiledMapLayerData {
  chunks: ITiledMapLayerChunkData[];
  encoding: string;
  height: number;
  name: string;
  opacity: number;
  startx: number;
  starty: number;
  visible: boolean;
  width: number;
  x: number;
  y: number;
}
