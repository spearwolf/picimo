import {IConfigurator} from '../IConfigurator';

import {DisplayMode} from '../types';

import {AAPerformanceConfigurator} from './AAPerformanceConfigurator';
import {AAQualityConfigurator} from './AAQualityConfigurator';
import {PixelatedConfigurator} from './PixelatedConfigurator';

export function makeConfigurator(mode: DisplayMode): IConfigurator {
  switch (mode) {
    case DisplayMode.AAQuality:
      return new AAQualityConfigurator();

    case DisplayMode.AAPerformance:
      return new AAPerformanceConfigurator();

    case DisplayMode.Pixelated:
    default:
      return new PixelatedConfigurator();
  }
}
