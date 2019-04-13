"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let EnvResult = class EnvResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], EnvResult.prototype, "serviceName", void 0);
EnvResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], EnvResult);
exports.EnvResult = EnvResult;
//# sourceMappingURL=env-result.dto.js.map