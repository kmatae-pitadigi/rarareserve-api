"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let SigninResult = class SigninResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], SigninResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SigninResult.prototype, "message", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SigninResult.prototype, "token", void 0);
SigninResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], SigninResult);
exports.SigninResult = SigninResult;
//# sourceMappingURL=signin-result.dto.js.map