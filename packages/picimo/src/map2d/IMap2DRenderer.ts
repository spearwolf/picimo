import { Map2DView } from './Map2DView';

export interface IMap2DRenderer {

  beginRender(view: Map2DView): void;
  endRender(view: Map2DView): void;

}
