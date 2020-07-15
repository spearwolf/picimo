import {BufferGeometry, InterleavedBuffer, Object3D} from 'three';

import {SpriteGroup} from './SpriteGroup';

import {createBufferAttributes} from './lib/createBufferAttributes';
import {updateBuffers} from './lib/updateBuffers';

export class SpriteGroupBufferGeometry<T, U> extends BufferGeometry {
  readonly picimoType: string = 'SpriteGroupBufferGeometry';

  /**
   * Initial parameters at creation time
   */
  readonly parameters: {
    spriteGroup: SpriteGroup<T, U>;
  };

  private readonly _buffers: THREE.InterleavedBuffer[];

  constructor(spriteGroup: SpriteGroup<T, U>) {
    super();

    this.parameters = {
      spriteGroup,
    };

    if (spriteGroup.indices) {
      this.setIndex(spriteGroup.indices.indices);
    }

    this._buffers = createBufferAttributes(
      spriteGroup,
      this,
      (typedArray, stride) => new InterleavedBuffer(typedArray, stride),
    );

    spriteGroup.voPool.voArray.serial = this.bufferVersion;
  }

  updateBuffers(): void {
    this._buffers.forEach((buf) => {
      buf.needsUpdate = true;
    });
  }

  get bufferVersion(): number {
    return this._buffers[0].version;
  }

  onBeforeRender(): void {
    const {spriteGroup} = this.parameters;

    updateBuffers(
      spriteGroup,
      () => this.bufferVersion,
      () => this.updateBuffers(),
    );

    const {usedCount, indices} = spriteGroup;
    this.setDrawRange(
      0,
      indices == null
        ? usedCount * spriteGroup.descriptor.vertexCount
        : usedCount * indices.itemCount,
    );
  }

  updateBeforeRenderObject(object3d: Object3D): Object3D {
    object3d.onBeforeRender = this.onBeforeRender.bind(this);
    return object3d;
  }
}
