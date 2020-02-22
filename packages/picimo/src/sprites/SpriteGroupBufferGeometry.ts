import {BufferGeometry, InterleavedBuffer} from 'three';

import {SpriteGroup} from './SpriteGroup';

import {createBufferAttributes} from './lib/createBufferAttributes';

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

    this.setIndex(spriteGroup.indices.indices);

    this._buffers = createBufferAttributes(spriteGroup, this, (typedArray, stride) => new InterleavedBuffer(typedArray, stride));

    spriteGroup.voPool.voArray.serial = this.bufferVersion;
  }

  updateBuffers() {
    this._buffers.forEach((buf) => {
      buf.needsUpdate = true;
    });
  }

  get bufferVersion() {
    return this._buffers[0].version;
  }

}
