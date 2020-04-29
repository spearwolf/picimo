import {Scene, Texture, Material, Group} from 'three';

import {MaterialCache} from '../textures';

import {IMap2DLayer} from './IMap2DLayer';
import {IMap2DRenderer} from './IMap2DRenderer';
import {Map2DContext} from './Map2DContext';
import {Map2DView} from './Map2DView';

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
export class Map2D extends Scene implements IMap2DRenderer {
  static get BeginRenderEvent() {
    return 'map2dbeginrender';
  }
  static get EndRenderEvent() {
    return 'map2dendrender';
  }

  readonly map2dLayers = new Set<IMap2DLayer>();
  readonly layersGroup = new Group();

  readonly materialCache = new MaterialCache<Texture, Material>();
  readonly context = new Map2DContext();

  constructor() {
    super();
    this.add(this.layersGroup);
    this.layersGroup.name = 'map2d.layers';
  }

  appendLayer(layer: IMap2DLayer) {
    const layers = this.map2dLayers;
    if (!layers.has(layer)) {
      layers.add(layer);
      const obj3d = layer.getObject3D();
      this.layersGroup.add(obj3d);
    }
  }

  removeLayer(layer: IMap2DLayer) {
    const layers = this.map2dLayers;
    if (layers.has(layer)) {
      layers.delete(layer);
      this.layersGroup.remove(layer.getObject3D());
    }
  }

  beginRender(view: Map2DView) {
    this[$dispatchEvent](Map2D.BeginRenderEvent, {view});
  }

  endRender(view: Map2DView) {
    this[$dispatchEvent](Map2D.EndRenderEvent, {view});
  }

  dispose() {
    this.context.dispose();
    this.materialCache.all().forEach(({texture, material}) => {
      material.dispose();
      texture.dispose();
    });
  }

  private [$dispatchEvent](type: string, options?: Object) {
    this.layersGroup.children.forEach((obj3d) =>
      obj3d.dispatchEvent({type, map2d: this, ...options}),
    );
  }
}
