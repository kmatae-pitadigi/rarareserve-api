"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let SendResetPasswordMail = class SendResetPasswordMail {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SendResetPasswordMail.prototype, "email", void 0);
SendResetPasswordMail = tslib_1.__decorate([
    type_graphql_1.InputType()
], SendResetPasswordMail);
exports.SendResetPasswordMail = SendResetPasswordMail;
//# sourceMappingURL=send-reset-password-mail.dto.js.map