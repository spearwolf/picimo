import { VOAttrDescriptor } from './VOAttrDescriptor';
import { VODescriptor } from './VODescriptor';

export const createAliases = (descriptor: VODescriptor, aliases: any) => {
  if (typeof aliases !== 'object') return;

  Object.keys(aliases).forEach((name) => {
    let attr = aliases[name];

    if (typeof attr === 'string') {
      attr = descriptor.attr[attr];

      if (attr !== undefined) {
        descriptor.attr[name] = attr;
      }
    } else {
      descriptor.attr[name] = new VOAttrDescriptor(name, attr.type, attr.size, attr.offset, attr.byteOffset, !!attr.uniform, attr.scalars);
    }
  });
};
