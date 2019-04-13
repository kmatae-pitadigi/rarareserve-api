"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let Signup = class Signup {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "kana", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "email", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "postcode", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "address", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "phone", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "password", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Signup.prototype, "sex", void 0);
Signup = tslib_1.__decorate([
    type_graphql_1.InputType()
], Signup);
exports.Signup = Signup;
//# sourceMappingURL=signup.dto.js.map