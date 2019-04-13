"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
let SiteConfig = class SiteConfig {
};
tslib_1.__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", Number)
], SiteConfig.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SiteConfig.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SiteConfig.prototype, "email", void 0);
SiteConfig = tslib_1.__decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity({ name: 'siteconfig' })
], SiteConfig);
exports.SiteConfig = SiteConfig;
//# sourceMappingURL=site-config.js.map