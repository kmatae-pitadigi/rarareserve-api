"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let ChangeProfileResult = class ChangeProfileResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ChangeProfileResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfileResult.prototype, "message", void 0);
ChangeProfileResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], ChangeProfileResult);
exports.ChangeProfileResult = ChangeProfileResult;
//# sourceMappingURL=change-profile-result.dto.js.map