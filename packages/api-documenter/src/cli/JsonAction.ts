// 2020/05 code based upon ./YamlAction.ts and modified by spearwolf <wolfger@spearwolf.de>

import {ApiModel} from '@microsoft/api-extractor-model';

import {JsonDocumenter} from '../documenters/JsonDocumenter';

import {ApiDocumenterCommandLine} from './ApiDocumenterCommandLine';
import {BaseAction} from './BaseAction';

export class JsonAction extends BaseAction {
  public constructor(_parser: ApiDocumenterCommandLine) {
    super({
      actionName: 'json',
      summary:
        'Generate documentation as universal reference json files (*.json)',
      documentation:
        'Generates API documentation as a collection of files conforming' +
        ' to a custom api json format, which is used by the picimo.js api-docs' +
        ' pipeline.',
    });
  }

  protected onExecute(): Promise<void> {
    // override
    const apiModel: ApiModel = this.buildApiModel();
    const documenter: JsonDocumenter = new JsonDocumenter(apiModel);

    documenter.generateFiles(this.outputFolder);
    return Promise.resolve();
  }
}
