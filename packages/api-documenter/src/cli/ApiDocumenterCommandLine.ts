// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

// 2020/05 modified by spearwolf <wolfger@spearwolf.de>
//   - add JsonAction

import {CommandLineParser} from '@rushstack/ts-command-line';

import {GenerateAction} from './GenerateAction';
import {JsonAction} from './JsonAction';
import {MarkdownAction} from './MarkdownAction';
import {YamlAction} from './YamlAction';

export class ApiDocumenterCommandLine extends CommandLineParser {
  public constructor() {
    super({
      toolFilename: 'api-documenter',
      toolDescription:
        'Reads *.api.json files produced by api-extractor, ' +
        ' and generates API documentation in various output formats.',
    });
    this._populateActions();
  }

  protected onDefineParameters(): void {
    // override
    // No parameters
  }

  private _populateActions(): void {
    this.addAction(new MarkdownAction(this));
    this.addAction(new YamlAction(this));
    this.addAction(new GenerateAction(this));
    this.addAction(new JsonAction(this));
  }
}
