import * as THREE from 'three';

import { IMap2DLayerRenderer } from '../IMap2DLayerRenderer';

export interface IMap2DLayer extends IMap2DLayerRenderer {

  dispose(): void;

  getObject3D(): THREE.Object3D;

}
