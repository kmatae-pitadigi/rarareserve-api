"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const env_service_1 = require("./env.service");
const env_resolver_1 = require("./env.resolver");
const site_config_module_1 = require("../site-config/site-config.module");
let EnvModule = class EnvModule {
};
EnvModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            site_config_module_1.SiteConfigModule
        ],
        providers: [
            env_service_1.EnvService,
            env_resolver_1.EnvResolver
        ]
    })
], EnvModule);
exports.EnvModule = EnvModule;
//# sourceMappingURL=env.module.js.map