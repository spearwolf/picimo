import {IMap2DLayerRenderer} from './IMap2DLayerRenderer';

import * as THREE from 'three';

export interface IMap2DLayer extends IMap2DLayerRenderer {
  dispose(): void;

  getObject3D(): THREE.Object3D;
}
