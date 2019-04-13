"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const email_module_1 = require("../email/email.module");
const user_module_1 = require("../user/user.module");
const signup_service_1 = require("./signup.service");
const signup_resolver_1 = require("./signup.resolver");
let SignupModule = class SignupModule {
};
SignupModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            email_module_1.EmailModule
        ],
        providers: [
            signup_service_1.SignupService,
            signup_resolver_1.SignupResolver
        ],
        controllers: [],
        exports: []
    })
], SignupModule);
exports.SignupModule = SignupModule;
//# sourceMappingURL=signup.module.js.map