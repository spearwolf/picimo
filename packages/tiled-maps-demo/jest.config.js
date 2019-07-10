module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  testRegex: '/__tests__/.*\\.spec\\.[tj]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
