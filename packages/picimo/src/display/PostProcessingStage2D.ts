import {WebGLRenderer} from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';

import {DisplayOnFrameOptions, DisplayOnResizeOptions} from './Display';
import {Stage2D} from './Stage2D';

export class PostProcessingStage2D extends Stage2D {
  composer: EffectComposer;

  resize(params: DisplayOnResizeOptions): void {
    super.resize(params);

    const composer = this.getComposer(params.display.renderer);
    composer.setSize(params.width, params.height);
  }

  frame({display}: DisplayOnFrameOptions): void {
    const composer = this.getComposer(display.renderer);
    composer.render();
  }

  private getComposer(renderer: WebGLRenderer) {
    let {composer} = this;
    if (!composer) {
      composer = this.createComposer(renderer);
      this.composer = composer;
    }
    return composer;
  }

  private createComposer(renderer: WebGLRenderer) {
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(this.scene, this.camera));
    return composer;
  }
}
