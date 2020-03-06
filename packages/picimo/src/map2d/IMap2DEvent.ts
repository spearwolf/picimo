import {Map2D} from './Map2D';
import {Map2DView} from './Map2DView';

import * as THREE from 'three';

export interface IMap2DEvent extends THREE.Event {
  map2d: Map2D;
  view: Map2DView;
}
