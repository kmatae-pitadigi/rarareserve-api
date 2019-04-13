"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./strategies/jwt-strategy");
const user_module_1 = require("../user/user.module");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secretOrPrivateKey: Buffer.from(process.env.RSA_PRIVATE_KEY, 'base64'),
                signOptions: {
                    algorithm: 'RSA256',
                    expiresIn: '24h'
                }
            }),
            user_module_1.UserModule
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy
        ],
        exports: [
            auth_service_1.AuthService
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map