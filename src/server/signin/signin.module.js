"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const signin_service_1 = require("./signin.service");
const signin_resolver_1 = require("./signin.resolver");
const auth_module_1 = require("../auth/auth.module");
let SigninModule = class SigninModule {
};
SigninModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule
        ],
        providers: [
            signin_service_1.SigninService,
            signin_resolver_1.SigninResolver
        ],
        controllers: [],
        exports: []
    })
], SigninModule);
exports.SigninModule = SigninModule;
//# sourceMappingURL=signin.module.js.map