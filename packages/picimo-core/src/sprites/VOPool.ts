import { maxOf } from '../math';
import { readOption, generateUuid } from '../utils';

import { VOArray } from './VOArray';
import { VODescriptor, VertexObject } from './VODescriptor';

export interface VOPoolOptions<T, U> {

  /**
   * Maximum number of vertex objects
   */
   capacity?: number;

   /**
     * A predefind vertex object array, otherwise a new one will be created
    */
   voArray?: VOArray;

   /**
    * Blueprint for unused vertex objects.
    * Set to `null` if you explicitly don't want to have a blueprint.
    */
   voZero?: VertexObject<T, U>;

   /**
    * Blueprint for new vertex objects
    * Set to `null` if you explicitly don't want to have a blueprint.
    */
   voNew?: VertexObject<T, U>;

   /**
    * Never allocate more than `maxAllocVOSize` vertex objects at once.
    * Vertex objects are usually reserved in batches, not individually.
    */
   maxAllocVOSize?: number;

   /**
    * Buffer usage hint.
    * A dynamic buffer usage is assumed as default.
    */
   dynamic?: boolean;

   /**
    * Buffer usage hint.
    * If `true` then it is assumed for each frame that the content of the buffer has changed,
    * so each time the buffer is uploaded to the gpu memory again.
    * This is the default behavior for dynamic buffers.
    */
   autotouch?: boolean;

}

/**
 * Pre-allocate a bunch of vertex objects.
 */
function createVOs<T, U> (voPool: VOPool<T, U>, maxAllocSize = 0) {
  const max = voPool.capacity - voPool.usedCount - voPool.allocatedCount;
  const count = maxAllocSize > 0 && maxAllocSize < max ? maxAllocSize : max;
  const len = voPool.allocatedCount + count;

  for (let i = voPool.allocatedCount; i < len; i++) {
    const voArray = voPool.voArray.subarray(i);
    const vertexObject = voPool.descriptor.createVO(voArray);

    vertexObject.free = voPool.free.bind(voPool, vertexObject);

    voPool.availableVOs.push(vertexObject);
  }
}

export class VOPool<T, U> {

  readonly id: string;

  readonly descriptor: VODescriptor<T, U>;

  readonly capacity: number;

  maxAllocVOSize: number;

  voArray: VOArray;

  voZero: VertexObject<T, U>;
  voNew: VertexObject<T, U>;

  dynamic: boolean;

  readonly availableVOs: VertexObject<T, U>[] = [];
  readonly usedVOs: VertexObject<T, U>[] = [];

  constructor(descriptor: VODescriptor<T, U>, options: VOPoolOptions<T, U>) {

    this.id = generateUuid();

    this.descriptor = descriptor;

    this.capacity = readOption(options, 'capacity', this.descriptor.maxIndexedVOPoolSize) as number;

    this.maxAllocVOSize = readOption(options, 'maxAllocVOSize', 0) as number;

    this.voZero = readOption(options, 'voZero', () => descriptor.createVO()) as VertexObject<T, U>;
    this.voNew = readOption(options, 'voNew', () => descriptor.createVO()) as VertexObject<T, U>;

    this.dynamic = readOption(options, 'dynamic', true) as boolean;

    this.voArray = readOption(options, 'voArray', () => descriptor.createVOArray(this.capacity, {
      dynamic: this.dynamic,
      autotouch: readOption(options, 'autotouch', this.dynamic) as boolean,
    })) as VOArray;

    createVOs(this, this.maxAllocVOSize);

  }

  /**
   * Number of vertex objects in use
   */
  get usedCount() {
    return this.usedVOs.length;
  }

  /**
   * Number of vertex objects still available
   */
  get availableCount() {
    return this.capacity - this.usedVOs.length;
  }

  /**
   * Number of *reserved* vertex objects
   */
  get allocatedCount() {
    return this.availableVOs.length + this.usedVOs.length;
  }

  /**
   * Allocate a vertex object
   */
  alloc() {
    let vo = this.availableVOs.shift();

    if (vo === undefined) {
      if ((this.capacity - this.allocatedCount) > 0) {
        createVOs(this, this.maxAllocVOSize);
        vo = this.availableVOs.shift();
      } else {
        return;
      }
    }

    this.usedVOs.push(vo);

    const { voNew } = this;
    if (voNew) {
      vo.voArray.copy(voNew.voArray);
    }

    return vo;
  }

  /**
   * Allocate multiple vertex objects at once
   */
  multiAlloc(size: number, targetArray: VertexObject<T, U>[] = []) {

    if ((this.allocatedCount - this.usedCount) < size) {
      createVOs(this, maxOf(this.maxAllocVOSize, size - this.allocatedCount - this.usedCount));
    }

    const allocatedVOs = this.availableVOs.splice(0, size);
    this.usedVOs.push(...allocatedVOs);
    targetArray.push(...allocatedVOs);

    const { voNew } = this;
    if (voNew) {

      for (let i = 0, len = allocatedVOs.length; i < len; ++i) {
        allocatedVOs[i].voArray.copy(voNew.voArray);
      }

    }

    return targetArray;

  }

  /**
   * Free vertex objects
   */
  free(vo: VertexObject<T, U> | VertexObject<T, U>[]) {

    if (Array.isArray(vo)) {
      for (let i=0, len=vo.length; i < len; ++i) {
        this.free(vo[i]);
      }
      return;
    }

    const { usedVOs } = this;

    const idx = usedVOs.indexOf(vo);

    if (idx === -1) return;

    const lastIdx = usedVOs.length - 1;

    if (idx !== lastIdx) {
      const last = usedVOs[lastIdx];
      vo.voArray.copy(last.voArray);

      const tmp = last.voArray;
      last.voArray = vo.voArray;
      vo.voArray = tmp;

      usedVOs.splice(idx, 1, last);
    }

    this.usedVOs.pop();
    this.availableVOs.unshift(vo);

    const { voZero } = this;
    if (voZero) {
      vo.voArray.copy(voZero.voArray);
    }

  }

  /**
   * Free all vertex objects
   */
  freeAll() {

    const { voZero, usedVOs } = this;

    if (voZero) {
      for (let i = 0, len = usedVOs.length; i < len; ++i) {
        usedVOs[i].voArray.copy(voZero.voArray);
      }
    }

    this.availableVOs.splice(0, 0, ...usedVOs);
    usedVOs.length = 0;

  }
}
