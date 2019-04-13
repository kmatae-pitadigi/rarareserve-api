"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
let ChangeProfile = class ChangeProfile {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfile.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfile.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfile.prototype, "kana", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfile.prototype, "postcode", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfile.prototype, "address", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfile.prototype, "phone", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], ChangeProfile.prototype, "role", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], ChangeProfile.prototype, "ismailfrom", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], ChangeProfile.prototype, "sex", void 0);
ChangeProfile = tslib_1.__decorate([
    type_graphql_1.InputType()
], ChangeProfile);
exports.ChangeProfile = ChangeProfile;
//# sourceMappingURL=change-profile.dto.js.map