import {
  Object3D,
  Texture as ThreeTexture,
  NearestFilter,
  Mesh,
  Group,
  Material,
} from 'three';

import {ITileSet, Texture, MaterialCache} from '../textures';

import {DisposableContextValue} from '../utils/DisposableContext';

import {IMap2DLayer} from './IMap2DLayer';
import {Map2D} from './Map2D';
import {Map2DViewTile} from './Map2DViewTile';

import {TileQuadMaterial} from './TileQuad/TileQuadMaterial';
import {TileQuadMesh} from './TileQuad/TileQuadMesh';
import {TileQuadMeshCache} from './TileQuad/TileQuadMeshCache';

const $obj3d = Symbol('obj3d');
const $materials = Symbol('materials');
const $tiles = Symbol('tiles');

const $destroyTile = Symbol('destroyTile');
const $createTileMesh = Symbol('createTileMesh');
const $meshCache = Symbol('meshCache');
const $materialCache = Symbol('materialCache');
const $freeMesh = Symbol('freeMesh');

function makeThreeTexture(textureSource: Texture) {
  const texture = new ThreeTexture(textureSource.imgEl);

  texture.flipY = false;
  texture.minFilter = NearestFilter;
  texture.magFilter = NearestFilter;
  texture.needsUpdate = true;

  return texture;
}

const constructMeshName = (tileId: string, mesh: Mesh) =>
  Array.isArray(mesh.material)
    ? `${tileId}[${mesh.material.map((mat) => mat.uuid).join(',')}]`
    : `${tileId}[${mesh.material.uuid}]`;

const SharedMeshCache: DisposableContextValue<TileQuadMeshCache> = {
  key: 'tileQuadMeshCache',
  create: () => new TileQuadMeshCache(),
  dispose: (cache: TileQuadMeshCache) =>
    cache.dispose((mesh) => mesh.geometry.dispose()),
};

const getSharedMeshCache = (map2d: Map2D): TileQuadMeshCache => {
  map2d.disposableContext.create(SharedMeshCache);
  return map2d.disposableContext.get(SharedMeshCache);
};

/**
 * Represents a map2d layer.
 *
 * Each tile is rendered with the same material which is built upon the *base image* from the given [[ITileSet]].
 *
 * Internally a [[TileQuadMesh]] is used for the tiles.
 */

export class Map2DTileQuadsLayer implements IMap2DLayer {
  readonly tilesets: ITileSet[];

  private readonly [$obj3d]: Group = new Group();

  private readonly [$tiles]: Map<string, TileQuadMesh[]> = new Map();

  private readonly [$meshCache]: TileQuadMeshCache;

  private readonly [$materials]: string[];
  private readonly [$materialCache]: MaterialCache<ThreeTexture, Material>;

  static appendNewLayer(
    map2d: Map2D,
    tilesets: ITileSet[],
  ): Map2DTileQuadsLayer {
    const layer = new Map2DTileQuadsLayer(
      tilesets,
      getSharedMeshCache(map2d),
      map2d.materialCache,
    );
    map2d.appendLayer(layer);
    return layer;
  }

  constructor(
    tilesets: ITileSet[],
    meshCache: TileQuadMeshCache,
    materialCache: MaterialCache<ThreeTexture, Material>,
  ) {
    this.tilesets = tilesets;
    this[$meshCache] = meshCache;
    this[$materialCache] = materialCache;

    this[$materials] = tilesets.map((tileset) => {
      const texSrc = tileset.getTextureSource();
      if (!materialCache.has(texSrc.uuid)) {
        const tex = makeThreeTexture(texSrc);
        materialCache.set(texSrc.uuid, tex, new TileQuadMaterial(tex), 0);
      }
      return texSrc.uuid;
    });
  }

  getObject3D(): Object3D {
    return this[$obj3d];
  }

  setViewOffset(x: number, y: number, depth: number): void {
    this[$obj3d].position.set(x, depth, y);
  }

  dispose(): void {
    Array.from(this[$tiles].values()).forEach((meshs) =>
      meshs.forEach((mesh) => this[$freeMesh](mesh)),
    );
    this[$tiles].clear();
  }

  addViewTile(tile: Map2DViewTile): void {
    const meshs = this[$createTileMesh](tile);
    if (meshs != null) {
      meshs.forEach((mesh) => {
        mesh.name = constructMeshName(tile.id, mesh);
        this[$obj3d].add(mesh);
      });
    }
  }

  removeViewTile(tileId: string): void {
    const meshs = this[$destroyTile](tileId);
    if (meshs != null) {
      meshs.forEach((mesh) => this[$freeMesh](mesh));
    }
  }

  renderViewTile(_tile: Map2DViewTile): void {
    // TODO animate tiles?
  }

  private [$freeMesh](mesh: TileQuadMesh) {
    // reset sprites
    mesh.tiles.clearTiles();
    // remove mesh from map2d scene
    this[$obj3d].remove(mesh);
    // add mesh to cache so we can reuse it later
    this[$meshCache].pushBackToCache(mesh);
    // decrease material reference count
    this[$materialCache].decRefCount(mesh.userData.externalMaterialId);
  }

  private [$destroyTile](id: string): TileQuadMesh[] {
    const tiles = this[$tiles];
    if (tiles.has(id)) {
      const meshs = tiles.get(id);
      tiles.delete(id);
      return meshs;
    }
    return null;
  }

  private [$createTileMesh](viewTile: Map2DViewTile): TileQuadMesh[] {
    const materials = this[$materials];
    const materialCache = this[$materialCache];
    const meshCache = this[$meshCache];
    const capacity = viewTile.width * viewTile.height;

    const meshs: TileQuadMesh[] = [];

    materials.forEach((matId, idx) => {
      const mesh = meshCache.createMesh(
        materialCache.getMaterial(matId),
        capacity,
        matId,
      );

      mesh.tiles.showTiles(viewTile, this.tilesets[idx]);

      if (mesh.tiles.usedCount > 0) {
        meshs.push(mesh);
        materialCache.incRefCount(matId);
      } else {
        // no tiles created, so we can push the mesh back to cache
        this[$meshCache].pushBackToCache(mesh);
      }
    });

    if (meshs.length > 0) {
      this[$tiles].set(viewTile.id, meshs);
      return meshs;
    }

    this[$tiles].delete(viewTile.id);
    return null;
  }
}
