import {
  InterleavedBuffer,
  InstancedInterleavedBuffer,
  BufferGeometry,
  InstancedBufferGeometry,
} from 'three';

import {SpriteGroup} from './SpriteGroup';

import {createBufferAttributes} from './lib/createBufferAttributes';

export class SpriteGroupInstancedBufferGeometry<
  T,
  U,
  K,
  I
> extends InstancedBufferGeometry {
  readonly picimoType = 'SpriteGroupInstancedBufferGeometry';

  /**
   * Initial parameters at creation time
   */
  readonly parameters: {
    spriteGroup: SpriteGroup<T, U>;
    baseSpriteGroup?: SpriteGroup<K, I>;
  };

  private readonly _buffers: InterleavedBuffer[];
  private readonly _instancedBuffers: InstancedInterleavedBuffer[];

  constructor(
    base: SpriteGroup<K, I> | BufferGeometry,
    spriteGroup: SpriteGroup<T, U>,
  ) {
    super();

    this.parameters = {spriteGroup};

    if ((base as SpriteGroup<K, I>).isSpriteGroup) {
      const baseSpriteGroup = base as SpriteGroup<K, I>;

      this.parameters.baseSpriteGroup = baseSpriteGroup;

      this.setIndex(baseSpriteGroup.indices.indices);

      this._buffers = createBufferAttributes(
        baseSpriteGroup,
        this,
        (typedArray, stride) => new InterleavedBuffer(typedArray, stride),
      );

      baseSpriteGroup.voPool.voArray.serial = this.bufferVersion;
    } else if ((base as any).isBufferGeometry) {
      this.copy(base as BufferGeometry);
    }

    this._instancedBuffers = createBufferAttributes(
      spriteGroup,
      this,
      (typedArray, stride) =>
        new InstancedInterleavedBuffer(typedArray, stride, 1),
    );

    spriteGroup.voPool.voArray.serial = this.instancedBufferVersion;
  }

  get maxInstancedCount() {
    return this.parameters.spriteGroup.usedCount;
  }

  set maxInstancedCount(_x) {
    // ignore
  }

  updateBuffers() {
    this._buffers.forEach(buf => {
      buf.needsUpdate = true;
    });
  }

  updateInstancedBuffers() {
    this._instancedBuffers.forEach(buf => {
      buf.needsUpdate = true;
    });
  }

  get bufferVersion() {
    return this._buffers[0].version;
  }

  get instancedBufferVersion() {
    return this._instancedBuffers[0].version;
  }
}
