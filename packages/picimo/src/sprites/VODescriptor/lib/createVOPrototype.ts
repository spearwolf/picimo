/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {VOAttrDescriptor} from '../VOAttrDescriptor';

import {toArray} from './toArray';

export function createVOPrototype(descriptor: any, methods = {}): void {
  const propertiesObject = {
    toArray: {
      value: toArray(descriptor),
    },
  };

  Object.keys(descriptor.attr).forEach((name) => {
    const attr = descriptor.attr[name];
    VOAttrDescriptor.defineProperties(
      attr,
      propertiesObject,
      descriptor,
      methods,
    );
  });

  descriptor.propertiesObject = propertiesObject;
  descriptor.voPrototype = Object.create(methods, propertiesObject);
}
