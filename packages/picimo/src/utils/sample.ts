/**
 * Return a random element from an array.
 * @public
 */
export function sample<T>(arr: Array<T>): T {
  return arr[(Math.random() * arr.length) | 0];
}
