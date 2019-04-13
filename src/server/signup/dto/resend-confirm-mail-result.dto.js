"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let ResendConfirmMailResult = class ResendConfirmMailResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ResendConfirmMailResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ResendConfirmMailResult.prototype, "message", void 0);
ResendConfirmMailResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], ResendConfirmMailResult);
exports.ResendConfirmMailResult = ResendConfirmMailResult;
//# sourceMappingURL=resend-confirm-mail-result.dto.js.map