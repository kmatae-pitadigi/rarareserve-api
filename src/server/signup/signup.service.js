"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const email_service_1 = require("../email/email.service");
const utils_1 = require("../utils/utils");
let SignupService = class SignupService {
    constructor(userService, emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }
    // サインアップする
    signup(signup, _url) {
        return new Promise((resolve, reject) => {
            // ユーザを登録する
            this.userService.add(signup)
                .then((signupResult) => {
                // 正常にユーザが追加できたら、登録完了メールを送る
                if (signupResult.result === 0) {
                    this.emailService.sendTokenMail('emailconfirm', 'verifytoken', signup.email, _url)
                        .then((result) => {
                        resolve(signupResult);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
                // ユーザ登録で何らかのエラーがあったらその結果を返す
                else {
                    resolve(signupResult);
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    // 登録完了メールを再送する
    resendConfirmMail(_resendConfirmMail, _url) {
        return new Promise((resolve, reject) => {
            // Eメールでユーザ情報を取得する
            this.userService.findByEmail(_resendConfirmMail.email)
                .then((user) => {
                if (!user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                // すでに登録済みならエラーにする
                else if (user.isemailconfirmed === 1) {
                    resolve({
                        result: false,
                        message: 'すでに登録が完了しています'
                    });
                }
                // いずれでもなければ登録完了用メールを送信する
                else {
                    this.emailService.sendTokenMail('emailconfirm', 'verifytoken', _resendConfirmMail.email, _url)
                        .then((result) => {
                        resolve({
                            result: true,
                            message: ''
                        });
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            });
        });
    }
    // パスワードリセットメールを再送する
    sendResetPasswordMail(_sendResetPasswordMail, _url) {
        return new Promise((resolve, reject) => {
            // Eメールでユーザ情報を取得する
            this.userService.findByEmail(_sendResetPasswordMail.email)
                .then((user) => {
                if (!user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                // 登録が未完了だったらエラーにする
                else if (user.isemailconfirmed === 0) {
                    resolve({
                        result: false,
                        message: 'ユーザの登録が完了していません。登録完了メールで登録を完了してください。'
                    });
                }
                else {
                    // パスワードリセットフラグを設定する
                    user.ispasswordreset = 1;
                    // ユーザを保存する
                    this.userService.save(user)
                        .then((saveUser) => {
                        // パスワードリセット用メールを送信する
                        this.emailService.sendTokenMail('resetpassword', 'resetpassword', _sendResetPasswordMail.email, _url)
                            .then((result) => {
                            resolve({
                                result: true,
                                message: ''
                            });
                        })
                            .catch((err) => {
                            reject(err);
                        });
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    // ユーザ登録を完了する
    confirmUser(_token) {
        return new Promise((resolve, reject) => {
            // トークンをチェックする
            utils_1.Utils.verifyToken(_token)
                .then((payload) => {
                if (!payload) {
                    resolve({
                        result: false,
                        message: 'トークンが正しくありません。有効期限を確認してください。'
                    });
                }
                else {
                    // Eメールアドレスのユーザが登録されているかを確認する
                    this.userService.findByEmail(payload.email)
                        .then((user) => {
                        if (!user) {
                            resolve({
                                result: false,
                                message: 'ユーザが登録されていません。'
                            });
                        }
                        else {
                            // すでに登録完了だったらエラーにする
                            if (user.isemailconfirmed === 1) {
                                resolve({
                                    result: false,
                                    message: user.email + 'はすでに登録完了済みです'
                                });
                            }
                            else {
                                // 登録完了フラグを設定する
                                user.isemailconfirmed = 1;
                                // ユーザ情報を保存する
                                this.userService.save(user)
                                    .then((saveUser) => {
                                    resolve({
                                        result: true,
                                        message: ''
                                    });
                                })
                                    .catch((err) => {
                                    reject(err);
                                });
                            }
                        }
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    // パスワードをリセットする
    resetPassword(resetPassword) {
        return new Promise((resolve, reject) => {
            // トークンをチェックする
            utils_1.Utils.verifyToken(resetPassword.token)
                .then((payload) => {
                if (!payload) {
                    resolve({
                        result: false,
                        message: 'トークンが正しくありません。有効期限を確認してください。'
                    });
                }
                else {
                    // パスワードをリセットする
                    this.userService.resetPassword(payload.email, resetPassword.password)
                        .then((resetPasswordResult) => {
                        resolve(resetPasswordResult);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
SignupService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [user_service_1.UserService,
        email_service_1.EmailService])
], SignupService);
exports.SignupService = SignupService;
//# sourceMappingURL=signup.service.js.map