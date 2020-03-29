import {Scene, Texture, Material, Group, Object3D} from 'three';

import {ITileSet, MaterialCache} from '../textures';

import {IMap2DLayer} from './IMap2DLayer';
import {IMap2DRenderer} from './IMap2DRenderer';
import {Map2DTileQuadsLayer} from './Map2DTileQuadsLayer';
import {Map2DView} from './Map2DView';

import {TileQuadMeshCache} from './TileQuad/TileQuadMeshCache';

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
export class Map2D extends Scene implements IMap2DRenderer {
  static get BeginRenderEvent() {
    return 'map2dbeginrender';
  }
  static get EndRenderEvent() {
    return 'map2dendrender';
  }

  readonly map2dLayers = new Set<IMap2DLayer>();
  readonly layersGroup = new Group();

  readonly materialCache: MaterialCache<Texture, Material>;
  readonly isExternalMaterialCache: boolean;

  private [$tileQuadMeshCache]: TileQuadMeshCache = null; // TODO move to Map2DTileQuadsLayer as static

  constructor(materialCache?: MaterialCache<Texture, Material>) {
    super();

    if (materialCache) {
      this.materialCache = materialCache;
      this.isExternalMaterialCache = true;
    } else {
      this.materialCache = new MaterialCache<Texture, Material>();
      this.isExternalMaterialCache = false;
    }

    this.add(this.layersGroup);
    this.layersGroup.name = 'map2d.layers';
  }

  /**
   * @param distanceToProjectionPlane use negative numbers to move the plane further away from the camera and positive numbers to move the plane closer to the camera
   */
  createTileQuadMeshLayer(tilesets: ITileSet[], distanceToProjectionPlane = 0) {
    // TODO extract to separat factory
    const layer = new Map2DTileQuadsLayer(
      tilesets,
      this[$getTileQuadMeshCache](),
      this.materialCache,
      distanceToProjectionPlane,
    );
    this.appendLayer(layer);
    return layer;
  }

  appendLayer(layer: IMap2DLayer) {
    const layers = this.map2dLayers;
    if (!layers.has(layer)) {
      layers.add(layer);
      const obj3d = layer.getObject3D();
      this.layersGroup.add(obj3d);
      obj3d.position.set(0, layer.getDistanceToProjectionPlane(), 0);
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
    const tileQuadMeshCache = this[$tileQuadMeshCache];
    if (tileQuadMeshCache) {
      tileQuadMeshCache.dispose((mesh) => mesh.geometry.dispose());
    }
    if (!this.isExternalMaterialCache) {
      this.materialCache.all().forEach(({texture, material}) => {
        material.dispose();
        texture.dispose();
      });
    }
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
    this.layersGroup.children.forEach((obj3d) =>
      obj3d.dispatchEvent({type, map2d: this, ...options}),
    );
  }
}
