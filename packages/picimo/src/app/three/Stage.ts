import {Scene} from "three";
import {IProjection} from "../../projection";
import {Display} from "./Display";

export class Stage {

  projection: IProjection;
  scene: Scene;

  constructor(projection?: IProjection, scene?: Scene) {
    this.projection = projection;
    this.scene = scene || new Scene();
  }

  resize({width, height}: {width: number, height: number}) {
    const {projection} = this;
    if (projection) {
      projection.update(width, height);
    }
  }

  frame({display: {renderer}}: {display: Display}) {
    const {projection, scene} = this;
    if (projection && scene) {
      renderer.render(scene, projection.camera);
    }
  }

}
