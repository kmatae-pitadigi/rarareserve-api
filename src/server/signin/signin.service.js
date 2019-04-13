"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
let SigninService = class SigninService {
    constructor(authService) {
        this.authService = authService;
    }
    signin(_email, _password) {
        return new Promise((resolve, reject) => {
            this.authService.auth(_email, _password)
                .then((signinResult) => {
                resolve(signinResult);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
SigninService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [auth_service_1.AuthService])
], SigninService);
exports.SigninService = SigninService;
//# sourceMappingURL=signin.service.js.map