"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let ResetPassword = class ResetPassword {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ResetPassword.prototype, "token", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ResetPassword.prototype, "password", void 0);
ResetPassword = tslib_1.__decorate([
    type_graphql_1.InputType()
], ResetPassword);
exports.ResetPassword = ResetPassword;
//# sourceMappingURL=reset-password.dto.js.map