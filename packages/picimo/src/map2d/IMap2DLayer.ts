import * as THREE from 'three';

import {IMap2DLayerRenderer} from './IMap2DLayerRenderer';

/**
 * The THREE enlargement from the IMap2DLayerRenderer.
 */
export interface IMap2DLayer extends IMap2DLayerRenderer {
  getObject3D(): THREE.Object3D;
  dispose(): void;
}
