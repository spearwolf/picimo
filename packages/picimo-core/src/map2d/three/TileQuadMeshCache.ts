import { Material } from 'three';

import { TileQuadMesh } from './TileQuadMesh';

const $cache = Symbol('cache');

const constructCacheKey = (material: Material | Material[], capacity: number) => Array.isArray(material)
  ? material.reduce((key, uuid) => `${uuid}:${key}`, `${capacity}`)
  : `${material.uuid}:${capacity}`;

export class TileQuadMeshCache {

  private readonly [$cache]: Map<string, Array<TileQuadMesh>> = new Map();

  createMesh(material: Material, capacity: number) {
    const cacheKey = constructCacheKey(material, capacity);
    const meshCache = this[$cache].get(cacheKey);

    let mesh = null;

    // reuse an instance from cache ..
    if (meshCache) {
      mesh = meshCache.shift();
    }

    // .. or create a new mesh!
    if (!mesh) {
      mesh = new TileQuadMesh(material, { capacity });
    }

    return mesh;
  }

  /**
   * Add mesh to internal cache so it is ready for later reuse
   */
  pushBackToCache(mesh: TileQuadMesh) {
    const cacheKey = constructCacheKey(mesh.material, mesh.tiles.capacity);
    const meshCache = this[$cache].get(cacheKey);
    if (meshCache) {
      meshCache.push(mesh);
    } else {
      this[$cache].set(cacheKey, [mesh]);
    }
  }

  dispose(fn: (mesh: TileQuadMesh) => void) {
    const cache = this[$cache];
    Array.from(cache.values()).forEach(meshCache => meshCache.forEach(fn));
    cache.clear();
  }

}
