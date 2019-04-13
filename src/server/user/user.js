"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
/**
 * ユーザテーブル
 */
let User = class User {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "kana", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "postcode", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "address", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "phone", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "isemailconfirmed", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "ispasswordreset", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "sex", void 0);
User = tslib_1.__decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity({ name: 'user' })
], User);
exports.User = User;
//# sourceMappingURL=user.js.map