"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let ResetPasswordResult = class ResetPasswordResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ResetPasswordResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ResetPasswordResult.prototype, "message", void 0);
ResetPasswordResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], ResetPasswordResult);
exports.ResetPasswordResult = ResetPasswordResult;
//# sourceMappingURL=reset-password-result.dto.js.map