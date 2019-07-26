import * as THREE from 'three';

import { IMap2DRenderer } from '../IMap2DRenderer';
import { Map2DView } from '../Map2DView';

import { IMap2DLayer } from './IMap2DLayer';
import { TileQuadMeshCache } from './TileQuadMeshCache';
import { Map2DTileQuadsLayer } from './Map2DTileQuadsLayer';
import { ITileSet } from 'src/textures';

const $map2dLayers = Symbol('map2dLayers');
const $dispatchEvent = Symbol('dispatchEvent');
const $tileQuadMeshCache = Symbol('tileQuadMeshCache');
const $getTileQuadMeshCache = Symbol('getTileQuadMeshCache');

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

  private [$tileQuadMeshCache]: TileQuadMeshCache = null;

  createTileQuadMeshLayer(tilesets: ITileSet[], position?: THREE.Vector3) {
    const layer = new Map2DTileQuadsLayer(tilesets, this[$getTileQuadMeshCache]());
    if (position) {
      layer.getObject3D().position.copy(position);
    }
    this.appendLayer(layer);
    return layer;
  }

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

  private [$getTileQuadMeshCache]() {
    let meshCache = this[$tileQuadMeshCache];
    if (!meshCache) {
      meshCache = new TileQuadMeshCache();
      this[$tileQuadMeshCache] = meshCache;
    }
    return meshCache;
  }

  private [$dispatchEvent](type: string, options?: Object) {
    this.children.forEach(obj3d => obj3d.dispatchEvent({ type, map2d: this, ...options }));
  }
}
