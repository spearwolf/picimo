/**
 * The reversed version of `pick()`.
 * @public
 */
export function unpick<T extends Object>(names: string[]) {
  return (obj?: Object): T | null => {
    let newObj: any = null;
    if (obj != null) {
      Object.keys(obj).forEach((key) => {
        if (!names.includes(key)) {
          const val = (obj as any)[key];
          if (val !== undefined) {
            if (newObj === null) {
              newObj = {};
            }
            newObj[key] = val;
          }
        }
      });
    }
    return newObj;
  };
}
