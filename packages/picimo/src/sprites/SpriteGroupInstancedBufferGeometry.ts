// @ts-nocheck
import {
  InterleavedBuffer,
  InstancedInterleavedBuffer,
  BufferGeometry,
  InstancedBufferGeometry,
  Object3D,
} from 'three';

import {Logger} from '../utils';

import {SpriteGroup} from './SpriteGroup';

import {createBufferAttributes} from './lib/createBufferAttributes';
import {updateBuffers} from './lib/updateBuffers';

const log = new Logger('picimo.SpriteGroupInstancedBufferGeometry');

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

  get instanceCount(): number {
    return this.parameters.spriteGroup.usedCount;
  }

  set instanceCount(_count: number) {
    // ignore updates from THREE.InstancedBufferGeometry
  }

  updateBuffers(): void {
    this._buffers.forEach((buf) => {
      buf.needsUpdate = true;
    });
  }

  updateInstancedBuffers(): void {
    this._instancedBuffers.forEach((buf) => {
      buf.needsUpdate = true;
    });
  }

  get bufferVersion(): number {
    return this._buffers[0].version;
  }

  get instancedBufferVersion(): number {
    return this._instancedBuffers[0].version;
  }

  onBeforeRender(): void {
    const {baseSpriteGroup, spriteGroup} = this.parameters;

    if (baseSpriteGroup) {
      updateBuffers(
        baseSpriteGroup,
        () => this.bufferVersion,
        () => this.updateBuffers(),
      );

      const {usedCount, indices} = baseSpriteGroup;
      if (indices != null) {
        this.setDrawRange(0, usedCount * indices.itemCount);
      } else if (log.WARN) {
        log.warn(
          'TODO setDrawRange(...) for SpriteGroupInstancedBufferGeometry without indices!',
        );
      }
    }

    updateBuffers(
      spriteGroup,
      () => this.instancedBufferVersion,
      () => this.updateInstancedBuffers(),
    );
  }

  updateBeforeRenderObject(object3d: Object3D): Object3D {
    object3d.onBeforeRender = this.onBeforeRender.bind(this);
    return object3d;
  }
}
