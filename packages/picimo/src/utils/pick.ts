
export const pick = <T extends Object>(names: string[]) => (obj?: Object): T | null => {
  let newObj: any = null;
  if (obj != null) {
    names.forEach((key) => {
      const val = (obj as any)[key];
      if (val !== undefined) {
        if (newObj === null) {
          newObj = {};
        }
        newObj[key] = val;
      }
    });
  }
  return newObj;
};
