import {Scene, Texture, Material, Group} from 'three';

import {MaterialCache} from '../textures';

import {DisposableContext} from '../utils/DisposableContext';

import {IMap2DLayer} from './IMap2DLayer';
import {IMap2DRenderer} from './IMap2DRenderer';
import {Map2DView} from './Map2DView';

function dispatchEvent(map2d: Map2D, type: string, options?: Object) {
  map2d.layersGroup.children.forEach((obj3d) =>
    obj3d.dispatchEvent({type, map2d, ...options}),
  );
}

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
  static get BeginRenderEvent(): string {
    return 'map2dbeginrender';
  }
  static get EndRenderEvent(): string {
    return 'map2dendrender';
  }

  readonly map2dLayers = new Set<IMap2DLayer>();
  readonly layersGroup: Group;

  // TODO remove...
  // - use a more generic solution here
  // - see feature/texture-store branch...
  // - integrate into disposableContext?
  readonly materialCache = new MaterialCache<Texture, Material>();

  /*
   * A generic property store.
   * When the Map2D->dispose() is called, all properties in the store will be also dispose()d
   */
  readonly disposableContext = new DisposableContext();

  constructor() {
    super();
    const group = new Group();
    group.name = 'map2d.layers';
    this.add((this.layersGroup = group));
  }

  setOrigin(x: number, y: number): void {
    this.position.set(x, 0, y);
    this.updateMatrix();
  }

  getOrigin(): [number, number] {
    return [this.position.x, this.position.z];
  }

  appendLayer(layer: IMap2DLayer): void {
    const layers = this.map2dLayers;
    if (!layers.has(layer)) {
      layers.add(layer);
      const obj3d = layer.getObject3D();
      this.layersGroup.add(obj3d);
    }
  }

  removeLayer(layer: IMap2DLayer): void {
    const layers = this.map2dLayers;
    if (layers.has(layer)) {
      layers.delete(layer);
      this.layersGroup.remove(layer.getObject3D());
    }
  }

  // TODO rename to beginUpdate()
  beginRender(view: Map2DView): void {
    dispatchEvent(this, Map2D.BeginRenderEvent, {view});
  }

  // TODO rename to endUpdate()
  endRender(view: Map2DView): void {
    dispatchEvent(this, Map2D.EndRenderEvent, {view});
  }

  dispose(): void {
    this.disposableContext.dispose();
    this.materialCache.all().forEach(({texture, material}) => {
      material.dispose();
      texture.dispose();
    });
  }
}
