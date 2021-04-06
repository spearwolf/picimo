/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const EXTERNALS = [
  [/^@babel\/runtime/, null],
  [/^eventize-js/, null],
  [/^three$/, null],
  [/^three\/examples\/jsm/, null],
  [/three\.module/, 'three'],
];

export function externalsPlugin() {
  return {
    name: 'rollup-plugin-picimo-externals',
    resolveId(source) {
      for (const [regex, id] of EXTERNALS) {
        if (regex.test(source)) {
          return {id: id ?? source, external: true};
        }
      }
      return null;
    },
  };
}
