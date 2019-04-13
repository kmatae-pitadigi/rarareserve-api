"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const site_config_service_1 = require("../site-config/site-config.service");
let EnvService = class EnvService {
    constructor(siteConfigService) {
        this.siteConfigService = siteConfigService;
    }
    getEnv() {
        return new Promise((resolve, reject) => {
            this.siteConfigService.getSiteConfig()
                .then((_siteConfig) => {
                resolve({
                    serviceName: _siteConfig.name
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
EnvService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [site_config_service_1.SiteConfigService])
], EnvService);
exports.EnvService = EnvService;
//# sourceMappingURL=env.service.js.map