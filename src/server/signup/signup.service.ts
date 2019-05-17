import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { EmailService } from '../email/email.service';
import { ISignupResult } from './interfaces/isignup-result.interface';
import { IUser } from '../user/interfaces/iuser.interface';
import { IResendConfirmMailResult } from './interfaces/iresend-confirm-mail-result.interface';
import { IResetPasswordResult } from './interfaces/ireset-password-result.interface';
import { Utils } from '../utils/utils';
import { IResendConfirmMail } from './interfaces/iresend-confirm-mail.interface';
import { ISendResetPasswordMail } from './interfaces/isend-reset-password-mail.interface';
import { ISendResetPasswordMailResult } from './interfaces/isend-reset-password-mail-result.interface';
import { IResetPassword } from './interfaces/ireset-password.interface';
import { SiteConfigService } from '../site-config/site-config.service';
import { SiteConfig } from '../site-config/site-config';

@Injectable()
export class SignupService {
    constructor(
        private readonly userService: UserService,
        private readonly emailService: EmailService,
        private readonly siteConfigService: SiteConfigService
    ) {}

    // サインアップする
    signup(_user: IUser, _url: string): Promise<ISignupResult> {
        return new Promise((resolve, reject) => {
            // ユーザを登録する
            this.userService.add(_user)
            .then((signupResult: ISignupResult) => {
                // 正常にユーザが追加できたら、登録完了メールを送る
                if (signupResult.result === 0) {
                    this.siteConfigService.get()
                    .then((_siteConfig: SiteConfig) => {
                        this.emailService.sendTokenMail(_siteConfig.emailconfirm, 'verifytoken', _user.email, _url)
                        .then((result: boolean) => {
                            resolve(signupResult);
                        })
                        .catch((err) => {
                            reject(err);
                        });
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
    resendConfirmMail(_resendConfirmMail: IResendConfirmMail, _url: string): Promise<IResendConfirmMailResult> {
        return new Promise((resolve, reject) => {
            // Eメールでユーザ情報を取得する
            this.userService.findByEmail(_resendConfirmMail.email)
            .then((user: IUser) => {
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
                    this.siteConfigService.get()
                    .then((_siteConfig: SiteConfig) => {
                        this.emailService.sendTokenMail(_siteConfig.emailconfirm, 'verifytoken', _resendConfirmMail.email, _url)
                        .then((result: boolean) => {
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
            });
        });
    }

    // パスワードリセットメールを再送する
    sendResetPasswordMail(_sendResetPasswordMail: ISendResetPasswordMail, _url: string): Promise<ISendResetPasswordMailResult> {
        return new Promise((resolve, reject) => {
            // Eメールでユーザ情報を取得する
            this.userService.findByEmail(_sendResetPasswordMail.email)
            .then((user: IUser) => {
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
                    .then((saveUser: IUser) => {
                        // パスワードリセット用メールを送信する
                        this.siteConfigService.get()
                        .then((_siteConfig: SiteConfig) => {
                            this.emailService.sendTokenMail(_siteConfig.resetpassword, 'resetpassword', _sendResetPasswordMail.email, _url)
                            .then((result: boolean) => {
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
    confirmUser(_token: string): Promise<IResendConfirmMailResult> {
        return new Promise((resolve, reject) => {
            // トークンをチェックする
            Utils.verifyToken(_token)
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
                    .then((user: IUser) => {
                        if (!user) {
                            resolve({
                                result: false,
                                message: 'ユーザが登録されていません。'
                            });
                        }
                        else {
                            // すでに登録完了だったらエラーにする
                            if ( user.isemailconfirmed === 1) {
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
                                .then((saveUser: IUser) => {
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
    resetPassword(resetPassword: IResetPassword): Promise<IResetPasswordResult> {
        return new Promise((resolve, reject) => {
            // トークンをチェックする
            Utils.verifyToken(resetPassword.token)
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
                    .then((resetPasswordResult: IResetPasswordResult) => {
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
}
