import {
  DynamicDrawUsage,
  StaticDrawUsage,
  InterleavedBufferAttribute,
  InterleavedBuffer,
  BufferGeometry,
} from 'three';

import {SpriteGroup} from '../SpriteGroup';

type CreateBufferFn<K> = (typedArray: any, stride: number) => K;

export function createBufferAttributes<T, U, K = InterleavedBuffer>(
  spriteGroup: SpriteGroup<T, U>,
  bufferGeometry: BufferGeometry,
  createBuffer: CreateBufferFn<K>,
): K[] {
  const {descriptor} = spriteGroup;
  const {voArray} = spriteGroup.voPool;

  const bufCollection: K[] = [];
  const bufMap: Map<string, K> = new Map();

  const {dynamic} = spriteGroup.voPool.voArray.hints;

  Object.keys(descriptor.attr).forEach((attrName) => {
    const attr = descriptor.attr[attrName];

    let buffer = bufMap.get(attr.type);

    if (!buffer) {
      const typedArray = voArray.getTypedArray(attr.type);
      const stride = descriptor.bytesPerVertex / typedArray.BYTES_PER_ELEMENT;

      buffer = createBuffer(typedArray, stride);
      (buffer as any).setUsage(dynamic ? DynamicDrawUsage : StaticDrawUsage);

      bufCollection.push(buffer);
      bufMap.set(attr.type, buffer);
    }

    const bufferAttr = new InterleavedBufferAttribute(
      buffer as any,
      attr.size,
      // @ts-ignore
      attr.byteOffset / buffer.array.BYTES_PER_ELEMENT,
    );
    bufferAttr.name = attrName;
    bufferGeometry.setAttribute(attrName, bufferAttr);
  });

  return bufCollection;
}
