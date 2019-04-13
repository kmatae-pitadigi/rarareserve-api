"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const site_config_1 = require("./site-config");
let SiteConfigService = class SiteConfigService {
    constructor(siteConfigRepogitory) {
        this.siteConfigRepogitory = siteConfigRepogitory;
    }
    getSiteConfig() {
        return new Promise((resolve, reject) => {
            this.siteConfigRepogitory.findOne(1)
                .then((siteConfig) => {
                resolve(siteConfig);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
SiteConfigService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(site_config_1.SiteConfig)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], SiteConfigService);
exports.SiteConfigService = SiteConfigService;
//# sourceMappingURL=site-config.service.js.map