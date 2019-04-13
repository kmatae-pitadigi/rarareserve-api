"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let ChangeEmailResult = class ChangeEmailResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ChangeEmailResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeEmailResult.prototype, "message", void 0);
ChangeEmailResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], ChangeEmailResult);
exports.ChangeEmailResult = ChangeEmailResult;
//# sourceMappingURL=change-email-result.dto.js.map