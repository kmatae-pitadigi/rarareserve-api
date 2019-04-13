"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let Signin = class Signin {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signin.prototype, "email", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signin.prototype, "password", void 0);
Signin = tslib_1.__decorate([
    type_graphql_1.InputType()
], Signin);
exports.Signin = Signin;
//# sourceMappingURL=signin.dto.js.map