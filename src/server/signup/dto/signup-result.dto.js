"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let SignupResult = class SignupResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], SignupResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SignupResult.prototype, "message", void 0);
SignupResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], SignupResult);
exports.SignupResult = SignupResult;
//# sourceMappingURL=signup-result.dto.js.map