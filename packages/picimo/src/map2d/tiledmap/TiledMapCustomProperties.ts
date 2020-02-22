import {ITiledMapCustomProperty} from './ITiledMapCustomProperty';

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
      const {value} = prop;
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
            console.warn(
              `custom property "${name}" has incorrect string format: "${value}" <- should be a number or a space separated list of 2-4x numbers`,
            );
        }
      }
    }
    return int4;
  }

  /**
   * Return and parse the value as comma separated list of strings.
   * Use the special char `\` to include the next char into the current string.
   * Strings can be optionally quoted by `'` or `"` (the quotes will not be part
   * of the string content).
   */
  valueAsCSLofStrings(name: string) {
    const prop = this.get(name);
    if (prop) {
      const value: string = prop.value as string;
      const len = value.length;
      const strings: string[] = [];
      const BACKSLASH = '\\';

      const addToContentString = (c: string) => {
        const l = strings.length - 1;
        strings[l] = `${strings[l]}${c}`;
      };

      let pos = 0;
      let mode = 0;
      let quote: "'" | '"' | undefined = undefined;

      while (pos < len) {
        let c = value[pos++];
        switch (mode) {
          case 0:
            // find first char of the next content string
            if (c === BACKSLASH) {
              strings.push('');
              mode = 1;
              break;
            } else if (c === `'` || c === `"`) {
              strings.push('');
              mode = 2;
              quote = c;
            } else if (c !== ' ') {
              strings.push('');
              mode = 5;
              addToContentString(c);
            }
            break;
          case 1:
            // next char is content
            addToContentString(c);
            mode = 5;
            break;
          case 2:
            // next char is content (inside quote)
            if (c === BACKSLASH) {
              mode = 3;
              break;
            } else if (c === quote) {
              mode = 4;
              break;
            } else {
              addToContentString(c);
            }
            break;
          case 3:
            addToContentString(c);
            mode = 2;
            break;
          case 4: // find comma
            while (pos < len && c !== ',') {
              c = value[pos++];
            }
            if (c === ',') {
              mode = 0;
            }
            break;
          case 5:
            // inside content strings (no quotes)
            if (c === BACKSLASH) {
              mode = 6;
            } else if (c === ',') {
              mode = 0;
            } else {
              addToContentString(c);
            }
            break;
          case 6:
            addToContentString(c);
            mode = 5;
            break;
        }
      }
      const res = strings.map(s => s.trim()).filter(s => s.length);
      if (res.length) {
        return res;
      }
    }
    return undefined;
  }
}
