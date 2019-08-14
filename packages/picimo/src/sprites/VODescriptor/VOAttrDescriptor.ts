import { BYTES_PER_ELEMENT, TYPED_ARRAY_GETTER } from './typedArrayHelpers';

const camelize = (name: string) => name[0].toUpperCase() + name.substr(1);

const attrPostfix = (attrDesc: VOAttrDescriptor, name: string, index: number): string => {
  if (attrDesc.scalars) {
    const postfix = attrDesc.scalars[index];

    if (postfix !== undefined) {
      return postfix;
    }
  }

  return `${name}_${index}`;
};

const getVNu = (getArray: any, offset: number) => function (attrIndex: number): number {
  // @ts-ignore
  return getArray(this.voArray)[offset + attrIndex];
};

const setVNu = (getArray: any, vectorLength: number, vertexCount: number, vertexAttrCount: number, offset: number) => function () {
  // @ts-ignore
  const arr = getArray(this.voArray);

  for (let i = 0; i < vertexCount; ++i) {
    for (let n = 0; n < vectorLength; ++n) {
      arr[(i * vertexAttrCount) + offset + n] = arguments[n];
    }
  }
};

const getV1u = (getArray: any, offset: number) => function (): number {
  // @ts-ignore
  return getArray(this.voArray)[offset];
};

const setVNv = (getArray: any, vectorLength: number, vertexCount: number, vertexAttrCount: number, offset: number) => function () {
  // @ts-ignore
  const arr = getArray(this.voArray);

  for (let i = 0; i < vertexCount; ++i) {
    for (let n = 0; n < vectorLength; ++n) {
      arr[(i * vertexAttrCount) + offset + n] = arguments[(i * vectorLength) + n];
    }
  }
};

const setV1u = (getArray: any, vertexCount: number, vertexAttrCount: number, offset: number) => function (value: number) {
  // @ts-ignore
  const arr = getArray(this.voArray);

  for (let i = 0; i < vertexCount; ++i) {
    arr[(i * vertexAttrCount) + offset] = value;
  }
};

export type VOArrayValueType = 'float32' | 'int16' | 'int32' | 'int8' | 'uint16' | 'uint32' | 'uint8';

/**
 * Vertex object attribute descriptor
 */
export class VOAttrDescriptor {

  name: string;

  type: VOArrayValueType;

  size: number;

  uniform: boolean;

  scalars: string[];

  bytesPerElement: number;
  bytesPerVertex: number;
  byteOffset: number;
  offset: number;

  /**
   * @param offset - either `offset` or `byteOffset` must be specified
   * @param byteOffset - either `offset` or `byteOffset` must be specified
   */
  constructor(name: string, type: VOArrayValueType, size: number, offset: number | undefined, byteOffset: number | undefined, uniform: boolean, scalars?: string[]) {

    this.name = name;

    this.type = type;

    this.size = size;

    this.uniform = uniform;

    this.scalars = scalars;

    this.bytesPerElement = BYTES_PER_ELEMENT[this.type];

    this.bytesPerVertex = this.bytesPerElement * size;

    this.byteOffset = typeof byteOffset !== 'number' ? offset * this.bytesPerElement : byteOffset;

    this.offset = typeof offset !== 'number' ? byteOffset / this.bytesPerElement : offset;

  }

  /**
   * Number of attributes per vertex
   */
  vertexAttrCount(descriptor: { bytesPerVertex: number }) {
    return descriptor.bytesPerVertex / this.bytesPerElement;
  }

  static defineProperties(attrDesc: any, propertiesObject: any, descriptor: any) {

    const { name } = attrDesc;
    const getArray = (TYPED_ARRAY_GETTER as any)[attrDesc.type];
    const { vertexCount } = descriptor;
    const vertexAttrCount = attrDesc.vertexAttrCount(descriptor);
    const offset = attrDesc.byteOffset / attrDesc.bytesPerElement;
    const hasMultipleVertices = descriptor.vertexCount > 1;

    if (attrDesc.size === 1) {
      if (attrDesc.uniform) {
        const valueGetter = getV1u(getArray, offset);
        const valueSetter = setV1u(getArray, vertexCount, vertexAttrCount, offset);

        attrDesc.getValue = (vo: any) => valueGetter.call(vo);
        attrDesc.setValue = (vo: any, arg: any) => valueSetter.call(vo, arg);

        propertiesObject[name] = {
          get: valueGetter,
          set: valueSetter,
          enumerable: true,
        };
      } else {
        const valueSetter = setVNv(getArray, 1, vertexCount, vertexAttrCount, offset);

        attrDesc.setValue = (vo: any, args: any) => valueSetter.apply(vo, args);

        propertiesObject[`set${camelize(name)}`] = {
          value: valueSetter,
          enumerable: true,
        };

        const valueGetters: any = [];

        for (let i = 0; i < descriptor.vertexCount; ++i) {
          const curValueGetter = getV1u(getArray, offset + (i * vertexAttrCount));

          valueGetters.push(curValueGetter);

          propertiesObject[`${name}${hasMultipleVertices ? i : ''}`] = {
            get: curValueGetter,
            set: setVNv(getArray, 1, 1, 0, offset + (i * vertexAttrCount)),
            enumerable: true,
          };
        }

        attrDesc.getValue = (vo: any, vi: any) => valueGetters[vi].call(vo);
      }
    } else if (attrDesc.size >= 2) {
      if (attrDesc.uniform) {
        const valueGetter = getVNu(getArray, offset);
        const valueSetter = setVNu(getArray, attrDesc.size, vertexCount, vertexAttrCount, offset);

        attrDesc.getValue = (vo: any, _vi: number, idx: number) => valueGetter.call(vo, idx);
        attrDesc.setValue = (vo: any, args: any) => valueSetter.apply(vo, args);

        propertiesObject[`get${camelize(name)}`] = {
          value: valueGetter,
          enumerable: true,
        };

        propertiesObject[`set${camelize(name)}`] = {
          value: valueSetter,
          enumerable: true,
        };

        for (let i = 0; i < attrDesc.size; ++i) {
          const setterName = attrPostfix(attrDesc, name, i);

          propertiesObject[setterName] = {
            get: getV1u(getArray, offset + i),
            set: setV1u(getArray, vertexCount, vertexAttrCount, offset + i),
            enumerable: true,
          };
        }
      } else {
        const valueSetter = setVNv(getArray, attrDesc.size, vertexCount, vertexAttrCount, offset);

        attrDesc.setValue = (vo: any, args: any) => valueSetter.apply(vo, args);

        propertiesObject[`set${camelize(name)}`] = {
          value: valueSetter,
          enumerable: true,
        };

        const valueGetters: any = [];

        for (let i = 0; i < descriptor.vertexCount; ++i) {
          const curVertexValueGetters = [];

          for (let j = 0; j < attrDesc.size; ++j) {
            const setterName = `${attrPostfix(attrDesc, name, j)}${hasMultipleVertices ? i : ''}`;
            const curValueGetter = getV1u(getArray, offset + (i * vertexAttrCount) + j);

            curVertexValueGetters.push(curValueGetter);

            propertiesObject[setterName] = {
              get: curValueGetter,
              set: setVNv(getArray, 1, 1, 0, offset + (i * vertexAttrCount) + j),
              enumerable: true,
            };
          }

          valueGetters.push(curVertexValueGetters);
        }

        attrDesc.getValue = (vo: any, vi: number, idx: number) => valueGetters[vi][idx].call(vo);
      }
    }
  }
}
