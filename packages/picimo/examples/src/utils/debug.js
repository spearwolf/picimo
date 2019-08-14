/* eslint-disable no-console */
/* eslint-env browser */

/**
 * @param {string} name 
 * @param {Object} obj 
 */
export const debug = (name, obj) => {
  console.log(name, obj);
  window[name] = obj;
};
