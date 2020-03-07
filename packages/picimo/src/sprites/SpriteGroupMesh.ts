import {Logger} from '../utils';

import {SpriteGroup} from './SpriteGroup';

import {SpriteGroupBufferGeometry} from './SpriteGroupBufferGeometry';
import {SpriteGroupInstancedBufferGeometry} from './SpriteGroupInstancedBufferGeometry';

import {Mesh, Material, BufferGeometry} from 'three';

const log = new Logger('picimo.SpriteGroupMesh');

function updateBuffers<T, U>(
  spriteGroup: SpriteGroup<T, U>,
  getBufferVersion: () => number,
  geometryUpdateBuffers: () => void,
) {
  const {serial, hints} = spriteGroup.voPool.voArray;

  const bufferVersion = getBufferVersion();

  if (hints.autotouch || serial !== bufferVersion) {
    geometryUpdateBuffers();
    spriteGroup.voPool.voArray.serial = bufferVersion;
  }
}

export class SpriteGroupMesh<T, U = {}, K = {}, I = {}> extends Mesh {
  geometry:
    | SpriteGroupBufferGeometry<T, U>
    | SpriteGroupInstancedBufferGeometry<T, U, K, I>;

  constructor(
    spriteGroupGeometry:
      | SpriteGroupBufferGeometry<T, U>
      | SpriteGroupInstancedBufferGeometry<T, U, K, I>,
    material: Material,
  ) {
    super(spriteGroupGeometry, material);

    this.geometry = spriteGroupGeometry || (new BufferGeometry() as any);

    log.log('created', this);
  }

  onBeforeRender = () =>
    /*
    _renderer: any,
    _scene: any,
    _camera: any,
    _geometry: Geometry | BufferGeometry,
    _material: any,
    _group: any,
    */
    {
      const {picimoType} = this.geometry;
      if (picimoType === 'SpriteGroupGeometry') {
        this.onBeforeRenderSpriteGroup();
      } else if (picimoType === 'SpriteGroupInstancedBufferGeometry') {
        this.onBeforeRenderSpriteGroupInstanced();
      }
    };

  dispose() {
    log.log('dispose', this);
    const {geometry, material} = this;
    geometry?.dispose();
    this.geometry = null;
    if (Array.isArray(material)) {
      material.forEach((mat: Material) => mat.dispose());
    } else {
      material?.dispose();
    }
    this.material = null;
  }

  private onBeforeRenderSpriteGroup() {
    const geometry = this.geometry as SpriteGroupBufferGeometry<T, U>;
    const {spriteGroup} = geometry.parameters;

    updateBuffers(
      spriteGroup,
      () => geometry.bufferVersion,
      () => geometry.updateBuffers(),
    );

    const {usedCount, indices} = spriteGroup;
    geometry.setDrawRange(0, usedCount * indices.itemCount);
  }

  private onBeforeRenderSpriteGroupInstanced() {
    const geometry = this.geometry as SpriteGroupInstancedBufferGeometry<
      T,
      U,
      K,
      I
    >;
    const {baseSpriteGroup, spriteGroup} = geometry.parameters;

    if (baseSpriteGroup) {
      updateBuffers(
        baseSpriteGroup,
        () => geometry.bufferVersion,
        () => geometry.updateBuffers(),
      );

      const {usedCount, indices} = baseSpriteGroup;
      geometry.setDrawRange(0, usedCount * indices.itemCount);
    }

    updateBuffers(
      spriteGroup,
      () => geometry.instancedBufferVersion,
      () => geometry.updateInstancedBuffers(),
    );

    // geometry.maxInstancedCount = spriteGroup.usedCount;
  }
}
