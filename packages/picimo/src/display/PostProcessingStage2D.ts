import {WebGLRenderer} from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';

import {Stage2D} from './Stage2D';
import {IDisplayOnFrameParamters, IDisplayOnResizeParameters} from './types';

export class PostProcessingStage2D extends Stage2D {
  composer: EffectComposer;

  resize(params: IDisplayOnResizeParameters): void {
    super.resize(params);

    const {display} = params;
    const composer = this.getComposer(display.renderer);
    composer.setSize(params.width, params.height);
    composer.setPixelRatio(display.pixelRatio);
  }

  frame({display}: IDisplayOnFrameParamters): void {
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
