
export const readOption = (options: any, propName: string, defValue?: any, funcArgs?: any): unknown => {
  if (options != null) {
    const val = options[propName];
    if (val !== undefined) return val;
  }
  if (typeof defValue === 'function') {
    return defValue(funcArgs);
  }
  return defValue;
};
