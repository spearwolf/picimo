export * from './hooks';
export * from './components';

export const VERSION =
  // @ts-ignore
  typeof PACKAGE_VERSION !== 'undefined' ? PACKAGE_VERSION : 'dev';
