
export function initializeVO(vertexObject: any, initializer: any) {

  switch (typeof initializer) { // eslint-disable-line
    case 'function':
      initializer(vertexObject);
      break;

    case 'object':
      Object.keys(initializer).forEach((key) => {
        const attrDesc = vertexObject.descriptor.attr[key];
        const value = initializer[key];
        if (attrDesc) {
          attrDesc.setValue(vertexObject, value);
        } else if (typeof vertexObject[key] === 'function') {
          vertexObject[key](value);
        } else {
          vertexObject[key] = value;
        }
      });
  }

}
