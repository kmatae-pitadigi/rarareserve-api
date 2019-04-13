"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const site_config_service_1 = require("./site-config.service");
const site_config_1 = require("./site-config");
let SiteConfigModule = class SiteConfigModule {
};
SiteConfigModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([site_config_1.SiteConfig])
        ],
        providers: [
            site_config_service_1.SiteConfigService
        ],
        exports: [
            site_config_service_1.SiteConfigService
        ]
    })
], SiteConfigModule);
exports.SiteConfigModule = SiteConfigModule;
//# sourceMappingURL=site-config.module.js.map