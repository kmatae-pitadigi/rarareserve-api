"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let ConfirmUserResult = class ConfirmUserResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ConfirmUserResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ConfirmUserResult.prototype, "message", void 0);
ConfirmUserResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], ConfirmUserResult);
exports.ConfirmUserResult = ConfirmUserResult;
//# sourceMappingURL=confirm-user-result.dto.js.map