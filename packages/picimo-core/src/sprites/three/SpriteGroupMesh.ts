import * as THREE from 'three';

import { SpriteGroup } from '../SpriteGroup';

import { SpriteGroupBufferGeometry } from './SpriteGroupBufferGeometry';
import { SpriteGroupInstancedBufferGeometry } from './SpriteGroupInstancedBufferGeometry';

function updateBuffers<T, U> (spriteGroup: SpriteGroup<T, U>, getBufferVersion: () => number, geometryUpdateBuffers: () => void) {

  const { serial, hints } = spriteGroup.voPool.voArray;

  const bufferVersion = getBufferVersion();

  if (hints.autotouch || serial !== bufferVersion) {
    geometryUpdateBuffers();
    spriteGroup.voPool.voArray.serial = bufferVersion;
  }

}

export class SpriteGroupMesh<T, U = {}, K = {}, I = {}> extends THREE.Mesh {

  // TODO override .dispose() so that we can free up the vertex object buffers

  constructor(
    spriteGroupGeometry: SpriteGroupBufferGeometry<T, U> | SpriteGroupInstancedBufferGeometry<T, U, K, I>,
    material: THREE.Material,
  ) {
    super(
      spriteGroupGeometry,
      material,
    );

    if (spriteGroupGeometry.type === 'spearwolf.SpriteGroupGeometry') {

      const { spriteGroup } = spriteGroupGeometry.parameters;

      this.onBeforeRender = /**
      * @param {THREE.WebGLRenderer} renderer
      * @param {THREE.Scene} scene
      * @param {THREE.Camera} camera
      * @param {SpriteGroupBufferGeometry} geometry
      */
        (_renderer, _scene, _camera, geometry: THREE.Geometry | THREE.BufferGeometry, _material, _group) => {

          updateBuffers(
            spriteGroup,
            () => (geometry as SpriteGroupBufferGeometry<T, U>).bufferVersion,
            () => (geometry as SpriteGroupBufferGeometry<T, U>).updateBuffers(),
          );

          const { usedCount, indices } = spriteGroup;
          (geometry as THREE.BufferGeometry).setDrawRange(0, usedCount * indices.itemCount);

        };

    } else if (spriteGroupGeometry.type === 'spearwolf.SpriteGroupInstancedBufferGeometry') {

      const {
        baseSpriteGroup,
        spriteGroup,
      } = (spriteGroupGeometry as SpriteGroupInstancedBufferGeometry<T, U, K, I>).parameters;

      this.onBeforeRender = /**
      * @param {THREE.WebGLRenderer} renderer
      * @param {THREE.Scene} scene
      * @param {THREE.Camera} camera
      * @param {SpriteGroupInstancedBufferGeometry} geometry
      */
        (_renderer, _scene, _camera, geometry: THREE.Geometry | THREE.BufferGeometry, _material, _group) => {

          if (baseSpriteGroup) {

            updateBuffers(
              baseSpriteGroup,
              () => (geometry as SpriteGroupBufferGeometry<T, U>).bufferVersion,
              () => (geometry as SpriteGroupBufferGeometry<T, U>).updateBuffers(),
            );

            const { usedCount, indices } = baseSpriteGroup;
            (geometry as THREE.BufferGeometry).setDrawRange(0, usedCount * indices.itemCount);

          }

          updateBuffers(
            spriteGroup,
            () => (geometry as SpriteGroupInstancedBufferGeometry<T, U, K, I>).instancedBufferVersion,
            () => (geometry as SpriteGroupInstancedBufferGeometry<T, U, K, I>).updateInstancedBuffers(),
          );

          // geometry.maxInstancedCount = spriteGroup.usedCount;

        };

    }

  }

}
