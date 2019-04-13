"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let ChangeEmail = class ChangeEmail {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeEmail.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeEmail.prototype, "email", void 0);
ChangeEmail = tslib_1.__decorate([
    type_graphql_1.InputType()
], ChangeEmail);
exports.ChangeEmail = ChangeEmail;
//# sourceMappingURL=change-email.dto.js.map