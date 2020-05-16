"use strict";
// 2020/05 code based upon ./YamlAction.ts and modified by spearwolf <wolfger@spearwolf.de>
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonAction = void 0;
const JsonDocumenter_1 = require("../documenters/JsonDocumenter");
const BaseAction_1 = require("./BaseAction");
class JsonAction extends BaseAction_1.BaseAction {
    constructor(_parser) {
        super({
            actionName: 'json',
            summary: 'Generate documentation as universal reference json files (*.json)',
            documentation: 'Generates API documentation as a collection of files conforming' +
                ' to a custom api json format, which is used by the picimo.js api-docs' +
                ' pipeline.',
        });
    }
    onExecute() {
        // override
        const apiModel = this.buildApiModel();
        const documenter = new JsonDocumenter_1.JsonDocumenter(apiModel);
        documenter.generateFiles(this.outputFolder);
        return Promise.resolve();
    }
}
exports.JsonAction = JsonAction;
