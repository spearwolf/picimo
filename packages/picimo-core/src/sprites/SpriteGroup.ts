import { pick } from '../utils';

import { VOPool } from './VOPool';
import { VODescriptor, VertexObject } from './VODescriptor';
import { VOArray } from './VOArray';
import { VOIndices } from './VOIndices';

export type SpriteSizeSetter<T, U> = (sprite: VertexObject<T, U>, w: number, h: number, descriptor: VODescriptor<T, U>) => void;

const pickVOPoolOpts = pick([
  'autotouch',
  'capacity',
  'doubleBuffer',
  'maxAllocVOSize',
  'dynamic',
  'voArray',
]);

function createSpriteSizeHook<T, U> (setSize: string | SpriteSizeSetter<T, U> = 'size'): SpriteSizeSetter<T, U> {
  switch (typeof setSize) {

    case 'string':
      return (sprite, w, h, descriptor) => (descriptor.attr[setSize] as any).setValue(sprite, [w, h]);

    case 'function':
      return setSize;

    case 'object':
    case 'boolean':
      if (!setSize) {
        return null;
      }

    default:
      throw new Error(`[SpriteGroup] invalid sprite size setter! (is ${typeof setSize} but should be a function, string, null or false)`);
  }
};

type VOIndicesFactoryFn = (capacity: number) => VOIndices;

export interface SpriteGroupOptions<T, U> {

  /**
   * Maximum number of vertex objects
   */
  capacity?: number;

  /**
   * Use your own [[VOArray]] instead of creating a new one
   */
  voArray?: VOArray;

  indices?: VOIndices | VOIndicesFactoryFn;

  /**
   * Blueprint for reserved (allocated but unused) vertex objects. See [[VOArray]].
   */
  voZero?: VertexObject<T, U>;

  /**
   * Blueprint for new (allocated) vertex objects. See [[VOArray]].
   */
  voNew?: VertexObject<T, U>;

  /**
   * A callback function that takes three arguments (sprite, width, height) and sets the size of sprite (called by `.createSprite(w, h)`).
   * As an alternative you can specify the *name* of the *size* attribute for the vertex objects (should be a 2d vector uniform).
   * Default is `setSize`.
   * This function is called every time a new sprite is created.
   * See [[SpriteGroup#createSprite]]
   */
  setSize?: string | SpriteSizeSetter<T, U>;

  /**
   * See [[VOArray]]
   */
  maxAllocVOSize?: number;

  /**
   * Buffer usage hint.
   * See [[VOArray]]
   */
  dynamic?: boolean;

  /**
   * Buffer usage hint.
   * See [[VOArray]]
   */
  autotouch?: boolean;

}

export class SpriteGroup<T, U> {

  readonly descriptor: VODescriptor<T, U>;

  readonly isSpriteGroup = true;

  setSpriteSize: SpriteSizeSetter<T, U>;

  readonly voPool: VOPool<T, U>;
  readonly indices: VOIndices;

  constructor(descriptor: VODescriptor<T, U>, options: SpriteGroupOptions<T, U> = {}) {

    this.descriptor = descriptor;

    this.isSpriteGroup = true;

    this.setSpriteSize = createSpriteSizeHook(options.setSize);

    const { voNew, voZero } = options;

    this.voPool = new VOPool(descriptor, Object.assign({
      maxAllocVOSize: 1000,
    }, pickVOPoolOpts(options), {
      voNew: voNew && descriptor.createVO(null, voNew),
      voZero: voZero && descriptor.createVO(null, voZero),
    }));

    const { indices } = options;
    this.indices = typeof indices === 'function' ? indices(this.capacity) : indices;

  }

  get capacity() {
    return this.voPool.capacity;
  }

  get usedCount() {
    return this.voPool.usedCount;
  }

  get availableCount() {
    return this.voPool.availableCount;
  }

  createSprite(width?: number, height?: number): VertexObject<T, U> {
    const sprite = this.voPool.alloc();
    const { setSpriteSize } = this;
    if (setSpriteSize && (width !== undefined || height !== undefined)) {
      setSpriteSize(sprite, width, height !== undefined ? height : width, this.descriptor);
    }
    return sprite;
  }

  /**
   * Create multiple sprites at once
   */
  createSprites(count: number, width?: number, height?: number) {
    const sprites = this.voPool.multiAlloc(count);
    const { setSpriteSize } = this;
    if (setSpriteSize && (width !== undefined || height !== undefined)) {
      const h = height !== undefined ? height : width;
      sprites.forEach(sprite => setSpriteSize(sprite, width, h, this.descriptor));
    }
    return sprites;
  }

  /**
   * Mark the internal vertex buffer so that it can be uploaded to the gpu memory the next time before we render it
   */
  touchVertexBuffers() {
    ++this.voPool.voArray.serial;
  }

}
