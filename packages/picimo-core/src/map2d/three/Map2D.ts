import * as THREE from 'three';

import { IMap2DRenderer } from '../IMap2DRenderer';
import { Map2DView } from '../Map2DView';

import { IMap2DLayer } from './IMap2DLayer';

const $map2dLayers = Symbol('map2dLayers');
const $dispatchEvent = Symbol('dispatchEvent');

/**
 * Represents a map2d scene.
 *
 * By default the map2d lies on the ground along the x and z axes.
 *
 * Since the map2d coordinate system is using (x, y) coordinates but webgl
 * uses a right-handed coordinate system by default the 3d *z* coordinate is mapped
 * to the internal 2d *y* map2d coordinate.
 */
export class Map2D extends THREE.Object3D implements IMap2DRenderer {

  static get BeginRenderEvent() { return 'map2dbeginrender'; }
  static get EndRenderEvent() { return 'map2dendrender'; }

  private readonly [$map2dLayers] = new Set<IMap2DLayer>();

  appendLayer(layer: IMap2DLayer) {
    const layers = this[$map2dLayers];
    if (!layers.has(layer)) {
      layers.add(layer);
      this.add(layer.getObject3D());
    }
  }

  removeLayer(layer: IMap2DLayer) {
    const layers = this[$map2dLayers];
    if (layers.has(layer)) {
      layers.delete(layer);
      this.remove(layer.getObject3D());
    }
  }

  beginRender(view: Map2DView) {
    this[$dispatchEvent](Map2D.BeginRenderEvent, { view });
  }

  endRender(view: Map2DView) {
    this[$dispatchEvent](Map2D.EndRenderEvent, { view });
  }

  private [$dispatchEvent](type: string, options?: Object) {
    this.children.forEach(obj3d => obj3d.dispatchEvent({ type, map2d: this, ...options }));
  }
}
