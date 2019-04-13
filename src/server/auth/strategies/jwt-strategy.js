"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const user_service_1 = require("../../user/user.service");
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(process.env.RSA_PUBLIC_KEY, 'base64')
        });
        this.userService = userService;
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findByEmail(payload.email);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            return user;
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [user_service_1.UserService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
//# sourceMappingURL=jwt-strategy.js.map