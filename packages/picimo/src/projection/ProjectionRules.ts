import {IProjectionRule} from './IProjectionRule';

/**
 * A `Projection` is configured with list of **rules** similar to _css styles and media queries_.
 *
 * A rule may have one or more **constraints**. The first rule applies where constraints fit.
 *
 * If a rule has no constraints it always fits.
 *
 * A rule has a **specs** section in which the camera is configured by one or more options.
 */
export class ProjectionRules<T extends IProjectionRule = IProjectionRule> {
  rules: T[];

  constructor(rules: T[]) {
    this.rules = rules;
  }

  findMatchingRule(width: number, height: number) {
    const curOrientation = height >= width ? 'portrait' : 'landscape';

    const {rules} = this;
    return (
      rules &&
      rules.find((rule) => {
        const {constraints} = rule;
        if (constraints) {
          const {orientation} = constraints;
          if (orientation && orientation !== curOrientation) {
            return false;
          }
          const {minWidth} = constraints;
          if (minWidth > 0 && width < minWidth) {
            return false;
          }
          const {minHeight} = constraints;
          if (minHeight > 0 && height < minHeight) {
            return false;
          }
          const {maxWidth} = constraints;
          if (maxWidth > 0 && width > maxWidth) {
            return false;
          }
          const {maxHeight} = constraints;
          if (maxHeight > 0 && height > maxHeight) {
            return false;
          }
        }
        return true;
      })
    );
  }
}
