import { ITiledMapCustomProperty } from "./ITiledMapCustomProperty";

const $props = Symbol('props');

export class TiledMapCustomProperties {

  private readonly [$props]: ITiledMapCustomProperty[];

  constructor(props: ITiledMapCustomProperty[]) {
    this[$props] = props;
  }

  get(name: string) {
    const prop = this[$props].find(prop => prop.name === name);
    if (prop) {
      return prop.value;
    }
  }
}
