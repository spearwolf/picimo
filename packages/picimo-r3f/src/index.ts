/* eslint-disable no-undef */
export * from './hooks';
export * from './components';

// @ts-ignore
export const VERSION = typeof PACKAGE_VERSION !== 'undefined' ? PACKAGE_VERSION : 'dev';
