"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let SendResetPasswordMailResult = class SendResetPasswordMailResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], SendResetPasswordMailResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SendResetPasswordMailResult.prototype, "message", void 0);
SendResetPasswordMailResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], SendResetPasswordMailResult);
exports.SendResetPasswordMailResult = SendResetPasswordMailResult;
//# sourceMappingURL=send-reset-password-mail-result.dto.js.map