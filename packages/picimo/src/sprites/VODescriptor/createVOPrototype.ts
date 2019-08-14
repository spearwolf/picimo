import { VOAttrDescriptor } from './VOAttrDescriptor';
import { toArray } from './toArray';

export function createVOPrototype(descriptor: any, methods = {}) {
  const propertiesObject = {
    toArray: {
      value: toArray(descriptor),
    },
  };

  Object.keys(descriptor.attr).forEach((name) => {
    const attr = descriptor.attr[name];
    VOAttrDescriptor.defineProperties(attr, propertiesObject, descriptor);
  });

  descriptor.propertiesObject = propertiesObject;
  descriptor.voPrototype = Object.create(methods, propertiesObject);
};
