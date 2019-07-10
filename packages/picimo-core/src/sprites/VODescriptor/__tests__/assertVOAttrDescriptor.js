import assert from 'assert';

/** @private */
export default (descriptor, names, size, offset, uniform, scalars) => {
  const name = Array.isArray(names) ? names[0] : names;
  const alias = Array.isArray(names) ? names[1] : names;
  assert(descriptor.hasAttribute(name, size), `descriptor.hasAttribute("${name}", ${size})`);
  const attr = descriptor.attr[name];
  assert(attr, `descriptor.attr.${name}`);
  assert.equal(attr.name, alias, '.name');
  assert.equal(attr.size, size, '.size');
  assert.equal(attr.offset, offset, '.offset');
  assert.equal(attr.uniform, uniform, '.uniform');
  if (scalars) {
    assert.deepEqual(attr.scalars, scalars, '.scalars');
  } else {
    assert(attr.scalars === undefined, '.scalars');
  }
};
