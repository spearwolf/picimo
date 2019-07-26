import { ITiledMapCustomProperty } from "./ITiledMapCustomProperty";

const $props = Symbol('props');

export class TiledMapCustomProperties {

  private readonly [$props]: ITiledMapCustomProperty[];

  constructor(props: ITiledMapCustomProperty[]) {
    this[$props] = props;
  }

  get(name: string): ITiledMapCustomProperty {
    return this[$props].find(prop => prop.name === name) || null;
  }

  value(name: string) {
    const prop = this.get(name);
    return prop !== null ? prop.value : undefined;
  }

  valueAsCssShorthandInt4(name: string) {
    let int4 = [0, 0, 0, 0];
    const prop = this.get(name);
    if (prop !== null) {
      const { value } = prop;
      if (typeof value === 'number') {
        const int = parseInt(`${value}`, 10);
        int4 = [int, int, int, int];
      } else if (typeof value === 'string') {
        const numbers = value.split(' ').map(str => parseInt(str, 10));
        switch (numbers.length) {
          case 1:
            int4 = [numbers[0], numbers[0], numbers[0], numbers[0]];
            break;
          case 2:
            int4 = [numbers[0], numbers[1], numbers[0], numbers[1]];
            break;
          case 3:
            int4 = [numbers[0], numbers[1], numbers[2], numbers[1]];
            break;
          case 4:
            int4 = [numbers[0], numbers[1], numbers[2], numbers[3]];
            break;
          default:
            console.warn(`custom property "${name}" has incorrect string format: "${value}" <- should be a number or a space separated list of 2-4x numbers`);
        }
      }
    }
    return int4;
  }

}
