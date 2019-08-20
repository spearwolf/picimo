import { IProjectionSpecs } from "./IProjectionSpecs";

export interface IProjectionConstraints {

  /**
   * `portait`: the height is greater than or equal to the width
   * 
   * `landscape`: the width is greater than the height
   */
  orientation?: 'portrait' | 'landscape';

  minWidth?: number;
  maxWidth?: number;

  minHeight?: number;
  maxHeight?: number;

}

export interface IProjectionRule {

  constraints?: IProjectionConstraints;

  specs: IProjectionSpecs;

}
