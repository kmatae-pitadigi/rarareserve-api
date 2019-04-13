"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
const site_config_module_1 = require("../site-config/site-config.module");
let EmailModule = class EmailModule {
};
EmailModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            site_config_module_1.SiteConfigModule
        ],
        providers: [
            email_service_1.EmailService
        ],
        controllers: [],
        exports: [
            email_service_1.EmailService
        ]
    })
], EmailModule);
exports.EmailModule = EmailModule;
//# sourceMappingURL=email.module.js.map