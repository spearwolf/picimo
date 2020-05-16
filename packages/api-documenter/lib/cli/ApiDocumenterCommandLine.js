"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDocumenterCommandLine = void 0;
// 2020/05 modified by spearwolf <wolfger@spearwolf.de>
//   - add JsonAction
const ts_command_line_1 = require("@rushstack/ts-command-line");
const GenerateAction_1 = require("./GenerateAction");
const JsonAction_1 = require("./JsonAction");
const MarkdownAction_1 = require("./MarkdownAction");
const YamlAction_1 = require("./YamlAction");
class ApiDocumenterCommandLine extends ts_command_line_1.CommandLineParser {
    constructor() {
        super({
            toolFilename: 'api-documenter',
            toolDescription: 'Reads *.api.json files produced by api-extractor, ' +
                ' and generates API documentation in various output formats.',
        });
        this._populateActions();
    }
    onDefineParameters() {
        // override
        // No parameters
    }
    _populateActions() {
        this.addAction(new MarkdownAction_1.MarkdownAction(this));
        this.addAction(new YamlAction_1.YamlAction(this));
        this.addAction(new GenerateAction_1.GenerateAction(this));
        this.addAction(new JsonAction_1.JsonAction(this));
    }
}
exports.ApiDocumenterCommandLine = ApiDocumenterCommandLine;
