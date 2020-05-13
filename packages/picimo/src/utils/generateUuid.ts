/**
 * Generate an universally unique identifier.
 *
 * Based upon https://gist.github.com/jed/982883
 *
 * @returns a random v4 [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) of the form `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`
 * @public
 */
export function generateUuid(): string {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (a) =>
    (a ^ ((Math.random() * 16) >> (a / 4))).toString(16),
  );
}
