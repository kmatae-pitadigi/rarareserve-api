"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("./user.service");
const user_1 = require("./user");
const user_resolver_1 = require("./user.resolver");
const email_module_1 = require("../email/email.module");
const site_config_module_1 = require("../site-config/site-config.module");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_1.User]),
            email_module_1.EmailModule,
            site_config_module_1.SiteConfigModule
        ],
        providers: [
            user_service_1.UserService,
            user_resolver_1.UserResolver
        ],
        controllers: [],
        exports: [
            user_service_1.UserService
        ]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map