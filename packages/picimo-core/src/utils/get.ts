
const arrayAccessor = new RegExp(/(.+)\[(\d+)\]$/);

const getProp = (obj: any, prop: string) => {
  const aa = arrayAccessor.exec(prop);
  if (aa) {
    const val = obj[aa[1]];
    if (val != null) {
      return val[parseInt(aa[2], 10)];
    }
    return;
  }
  return obj[prop];
};

/**
 * A rough and unpolished version of lodash's `get()`
 * @param path - The property path. Supports `.` (dots) and `[1]` (array access) syntax.
 */
export const get = (obj: Object, path: string): unknown => {
  if (obj != null) {
    if (path in obj) {
      return (obj as any)[path];
    }
    const items = path.split(/[.]/);
    const val = getProp(obj, items.shift());
    if (val != null && items.length) {
      return get(val, items.join('.'));
    }
    return val;
  }
};
