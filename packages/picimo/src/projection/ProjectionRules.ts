import {IProjectionRule} from './IProjectionRule';
import {IProjectionSpecs} from './IProjectionSpecs';

/**
 * A `Projection` is configured with list of **rules** similar to _css styles and media queries_.
 *
 * A rule may have one or more **constraints**. The first rule applies where constraints fit.
 *
 * If a rule has no constraints it always fits.
 *
 * A rule has a **specs** section in which the camera is configured by one or more options.
 */
export class ProjectionRules<TRule extends IProjectionRule = IProjectionRule> {
  static create<Specs extends IProjectionSpecs>(
    rules: Specs | IProjectionRule<Specs>[],
  ): ProjectionRules<IProjectionRule<Specs>> {
    return new ProjectionRules(Array.isArray(rules) ? rules : [{specs: rules}]);
  }

  rules: TRule[];

  constructor(rules: TRule[]) {
    this.rules = rules;
  }

  findMatchingRule(width: number, height: number): TRule | undefined {
    const curOrientation = height >= width ? 'portrait' : 'landscape';
    const {rules} = this;

    return (
      (rules &&
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
        })) ||
      undefined
    );
  }
}
