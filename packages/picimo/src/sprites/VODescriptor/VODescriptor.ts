import { VOArray, VOArrayUsageHints } from '../VOArray';

import { createAliases } from './createAliases';
import { createAttributes } from './createAttributes';
import { createTypedArrays } from './createTypedArrays';
import { createVO } from './createVO';
import { createVOPrototype } from './createVOPrototype';
import { initializeVO  } from './initializeVO';
import { VOAttrDescriptor } from './VOAttrDescriptor';

type VOAttrDataType = 'float32' | 'int16' | 'int32' | 'int8' | 'uint16' | 'uint32' | 'uint8';

export interface VOAttrDescription {

  name?: string;

  type?: VOAttrDataType;

  size?: number;

  uniform?: boolean;

  scalars?: string[];

}

interface VOAttrsMap {

    [attrName: string]: VOAttrDescription | string[];

};

export type VOAttributesDescription = VOAttrsMap | Array<VOAttrDescription>;

export interface VODescription<T> {

  vertexCount?: number;

  methods?: T;

  attributes: VOAttributesDescription;

  aliases?: any; // TODO remove or create real types

}

type toArrayFn = (attrList?: string[]) => number[];

interface VertexObjectMethods<T, U> {

  descriptor: VODescriptor<T, U>;

  voArray: VOArray;

  toArray: toArrayFn;

  /**
   * Free the vertex object
   */
  free: () => void;

}

export type VertexObject<T, U> = T & U & VertexObjectMethods<T, U>;

export type VOInitializerFn<T, U> = (vo: VertexObject<T, U>) => void;
export type VOInitializer<T, U> = Object | VOInitializerFn<T, U>;

/**
 * Vertex object descriptor
 *
 * @example
 * const descriptor = new VODescriptor({
 *
 *     methods: {
 *         foo() {
 *             return this.voArray.float32Array[0];
 *         }
 *     },
 *
 *     // vertex buffer layout
 *     // --------------------
 *     //
 *     // v0: (x0)(y0)(z0)(rotate)(s0)(t0)(tx)(ty)(scale)(opacity)
 *     // v1: (x1)(y1)(z1)(rotate)(s1)(t1)(tx)(ty)(scale)(opacity)
 *     // v2: (x2)(y2)(z2)(rotate)(s2)(t2)(tx)(ty)(scale)(opacity)
 *     // v3: (x3)(y3)(z3)(rotate)(s3)(t3)(tx)(ty)(scale)(opacity)
 *     //
 *     vertexCount: 4,
 *
 *     attributes: [
 *
 *         { name: 'position',  type: 'float32', size: 3, scalars: [ 'x', 'y', 'z' ] },
 *         { name: 'rotate',    type: 'float32', size: 1, uniform: true },
 *         { name: 'texCoords', type: 'float32', size: 2, scalars: [ 's', 't' ] },
 *         { name: 'translate', type: 'float32', size: 2, scalars: [ 'tx', 'ty' ], uniform: true },
 *         { name: 'scale',     type: 'float32', size: 1, uniform: true },
 *         { name: 'opacity',   type: 'float32', size: 1, uniform: true }
 *
 *     ],
 *
 *     aliases: {
 *
 *         pos2d: { size: 2, type: 'float32', offset: 0 },
 *         posZ:  { size: 1, type: 'float32', offset: 2, uniform: true },
 *         r:     { size: 1, type: 'float32', offset: 3 },
 *         uv:    'texCoords',
 *
 *     }
 *
 * });
 *
 */

export class VODescriptor<T = Object, U = Object> {

  /**
   * Number of vertices per vertex object
   */
  vertexCount: number;

  /**
   * Number of attributes per vertex
   */
  vertexAttrCount: number;

  bytesPerVO: number;
  bytesPerVertex: number;

  rightPadBytesPerVertex: number;

  typeList: VOAttrDataType[];

  attr: {
    [attrName: string]: VOAttrDescriptor;
  };

  scalars: string[];
  attrList: VOAttrDescription[];

  typedArrays: {
    float32: boolean;
    int16: boolean;
    int32: boolean;
    int8: boolean;
    uint16: boolean;
    uint32: boolean;
    uint8: boolean;
  };

  constructor({ vertexCount, attributes, aliases, methods }: VODescription<T>) {

    this.vertexCount = typeof vertexCount === 'number' ? vertexCount : parseInt(vertexCount, 10) || 1;

    createAttributes(this, attributes);
    createAliases(this, aliases);
    createVOPrototype(this, methods);
    createTypedArrays(this);

  }

  createVOArray(size = 1, hints?: VOArrayUsageHints): VOArray {
    return new VOArray(size, this.bytesPerVO, this.typeList, null, Object.assign({
      dynamic: true,
      autotouch: true,
    }, hints));
  }

  /**
   * Create a new *vertex object*.
   *
   * @returns the initialized *vertex object* instance
   */
  createVO(voArray?: VOArray, voInit?: VOInitializer<T, U>): VertexObject<T, U> {
    // @ts-ignore
    const vo = createVO(Object.create(this.voPrototype), this, voArray);

    if (voInit) {
      initializeVO(vo, voInit);
    }

    return vo;
  }

  /**
   * Check if *descriptor* has an attribute with a specific size.
   *
   * @param size - attribute items count
   */
  hasAttribute(name: string, size = 1) {
    // @ts-ignore
    const attr = this.attr[name];
    return attr && attr.size === size;
  }

  /**
   * Max number of vertex objects when a vertex buffer is used together
   * with a indexed element array to draw primitives. the reason for
   * such a limit is that webgl restricts element array indices
   * to an uint16 data type.
   */
  get maxIndexedVOPoolSize() {
    return Math.floor(65536 / this.vertexCount);
  }
}
