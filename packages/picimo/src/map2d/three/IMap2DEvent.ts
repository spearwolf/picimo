import * as THREE from 'three';

import { Map2DView } from '../Map2DView';

import { Map2D } from './Map2D';

export interface IMap2DEvent extends THREE.Event {
  map2d: Map2D;
  view: Map2DView;
}
