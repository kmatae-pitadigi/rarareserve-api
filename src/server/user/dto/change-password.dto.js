"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let ChangePassword = class ChangePassword {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangePassword.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangePassword.prototype, "password", void 0);
ChangePassword = tslib_1.__decorate([
    type_graphql_1.InputType()
], ChangePassword);
exports.ChangePassword = ChangePassword;
//# sourceMappingURL=change-password.dto.js.map