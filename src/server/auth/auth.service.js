"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    auth(_email, _password) {
        return new Promise((resolve, reject) => {
            // Eメールアドレスでユーザを検索する
            this.userService.findByEmail(_email)
                .then((user) => {
                // Eメールアドレスでユーザがヒットしなければundefined
                if (user === undefined) {
                    resolve({
                        result: false,
                        message: 'Eメールアドレスまたはパスワードが違います。',
                        token: ''
                    });
                }
                else {
                    // Eメールの確認が未完了ならエラーにする
                    if (!user.isemailconfirmed) {
                        resolve({
                            result: false,
                            message: '登録が完了していません。お送りした登録完了メールで登録を完了させてください。',
                            token: ''
                        });
                    }
                    else {
                        // パスワードが一致するかをチェックする
                        const match = bcrypt.compareSync(_password, user.password);
                        if (match === true) {
                            // JWTを作成する
                            const jwtPayload = { email: _email };
                            const signopt = {
                                algorithm: 'RS256',
                                expiresIn: '24h',
                                subject: _email
                            };
                            resolve({
                                result: true,
                                message: '',
                                token: this.jwtService.sign(jwtPayload, signopt)
                            });
                        }
                        else {
                            resolve({
                                result: false,
                                message: 'Eメールアドレスまたはパスワードが違います。',
                                token: ''
                            });
                        }
                    }
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
AuthService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map