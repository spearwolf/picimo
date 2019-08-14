import { BYTES_PER_ELEMENT } from './typedArrayHelpers';
import { VOAttrDescriptor } from './VOAttrDescriptor';
import { VODescriptor, VOAttrDescription, VOAttributesDescription } from './VODescriptor';

const DEFAULT_ATTR_TYPE = 'float32';

export const createAttributes = (descriptor: VODescriptor, attributesOrObject: VOAttributesDescription) => {
  let attributes: VOAttrDescription[];

  if (Array.isArray(attributesOrObject)) {
    attributes = attributesOrObject;
  } else if (typeof attributesOrObject === 'object') {
    attributes = Object.keys(attributesOrObject).map((name) => {
      const attrConf = attributesOrObject[name];
      return Object.assign({ name }, (Array.isArray(attrConf) ? { scalars: attrConf } : attrConf));
    });
  }

  if (!attributes) {
    throw new Error('[VODescriptor] option "attributes" should be an array or an object!');
  }

  descriptor.attr = {};
  descriptor.scalars = [];

  let offset = 0;
  let byteOffset = 0;

  for (let i = 0; i < attributes.length; ++i) {
    const attr = attributes[i];

    let attrSize = attr.size;
    if (attrSize === undefined) {
      if (Array.isArray(attr.scalars)) {
        attrSize = attr.scalars.length;
      } else {
        attrSize = 1;
      }
    }

    const type = attr.type || DEFAULT_ATTR_TYPE;

    if (BYTES_PER_ELEMENT[type] === undefined) {
      throw new Error(`[VODescriptor] attribute "${attr.name}" has unknown type: should be one of (${Object.keys(BYTES_PER_ELEMENT).join(', ')})`);
    }

    if (attr.name !== undefined) {
      descriptor.scalars.push(attr.name);
      descriptor.attr[attr.name] = new VOAttrDescriptor(attr.name, type, attrSize, offset, byteOffset, !!attr.uniform, attr.scalars);
    }

    offset += attrSize;
    byteOffset += BYTES_PER_ELEMENT[type] * attrSize;
  }

  // ensure that bytes per vertex is always aligned to 4-bytes!
  descriptor.rightPadBytesPerVertex = byteOffset % 4 > 0 ? 4 - (byteOffset % 4) : 0;

  descriptor.bytesPerVertex = byteOffset + descriptor.rightPadBytesPerVertex;
  descriptor.bytesPerVO = descriptor.bytesPerVertex * descriptor.vertexCount;
  descriptor.vertexAttrCount = offset;

  descriptor.attrList = descriptor.scalars.map(name => descriptor.attr[name]);
};
