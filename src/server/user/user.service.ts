import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user';
import { ISignupResult } from '../signup/interfaces/isignup-result.interface';
import { IUser } from './interfaces/iuser.interface';
import { IResetPasswordResult } from '../signup/interfaces/ireset-password-result.interface';
import { IChangeEmail } from './interfaces/ichange-email.interface';
import { IChangeEmailResult } from './interfaces/ichange-email-result.interface';
import { EmailService } from '../email/email.service';
import { IChangePassword } from './interfaces/ichange-password.interface';
import { IChangePasswordResult } from './interfaces/ichange-password-result.interface';
import { SiteConfigService } from '../site-config/site-config.service';
import { SiteConfig } from '../site-config/site-config';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly emailService: EmailService,
        private readonly siteConfigService: SiteConfigService
    ) {}

    // 指定されたEメールアドレスのユーザを検索する
    findByEmail(_email: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userRepository.findOne({
                where: { email: _email }
            })
            .then((user: User) => {
                resolve(user);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * IDでユーザ情報を取得する
     * @param _id: string ID
     * @return User: User ユーザ情報
     */
    findById(_id: string): Promise<User> {
        return new Promise((resolve, reject) => {
            this.userRepository.findOne(_id)
            .then((user: User) => {
                resolve(user);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    // ユーザを追加する
    add(_user: IUser): Promise<ISignupResult> {
        return new Promise((resolve, reject) => {
            this.findByEmail(_user.email)
            .then((user: User) => {
                if (user !== undefined) {
                    if (user.isemailconfirmed) {
                        resolve({
                            result: 1,
                            message: 'すでに登録されています。サインインしてください。'
                        });
                    }
                    else {
                        resolve({
                            result: 2,
                            message: '登録が完了していません。登録完了メールで登録を完了してください。'
                        });
                    }
                }
                else {
                    // パスワードはハッシュ化する
                    _user.password = this.getPasswordHash(_user.password);
                    // Eメール確認フラグは0に設定する
                    _user.isemailconfirmed = 0;
                    // ユーザ情報を登録する
                    this.userRepository.save(_user)
                    .then((result: User) => {
                        resolve({
                            result: 0,
                            message: ''
                        });
                    })
                    .catch((err: any) => {
                        reject(err);
                    });
                }
            })
            .catch((err: any) => {
                 reject(err);
            });
        });
    }

    // ユーザ情報を更新する
    save(_user: IUser): Promise<IUser> {
        return new Promise((resolve, reject) => {
            this.userRepository.save(_user)
            .then((user: IUser) => {
                resolve(user);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    resetPassword(_email: string, _password: string): Promise<IResetPasswordResult> {
        return new Promise((resolve, reject) => {
            // ユーザ情報を取得する
            this.findByEmail(_email)
            .then((user: IUser) => {
                // ユーザ情報が取得できなければエラーにする
                if (!user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                // パスワードリセットフラグが0ならエラーにする
                else if (user.ispasswordreset === 0) {
                    resolve({
                        result: false,
                        message: 'パスワードがリセットされていません'
                    });
                }
                // 指定されたパスワードを設定する
                else {
                    user.password = this.getPasswordHash(_password);
                    user.ispasswordreset = 0;
                    this.userRepository.save(user)
                    .then((resetUser: IUser) => {
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

    /**
     * Eメールアドレスを変更する
     * @params _changeEmail: IChangeEmail Eメールアドレス変更情報
     * @returns changeEmailResult: IChangeEmailResult Eメールアドレス変更結果
     */
    changeEmail(_changeEmail: IChangeEmail, _url: string): Promise<IChangeEmailResult> {
        return new Promise((resolve, reject) => {
            // IDに該当するユーザ情報を取得する
            this.findById(_changeEmail.id)
            .then((user: User) => {
                if (!user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                else {
                    // Eメールアドレスを変更する
                    user.email = _changeEmail.email;
                    // 登録完了フラグを0にする
                    user.isemailconfirmed = 0;
                    this.save(user)
                    .then((_saveUser: IUser) => {
                        this.siteConfigService.get()
                        .then((_siteConfig: SiteConfig) => {
                            this.emailService.sendTokenMail(_siteConfig.changeemailconfirm, 'verifytoken', _saveUser.email, _url)
                            .then((result: boolean) => {
                                if (result === true) {
                                    resolve({
                                        result: true,
                                        message: ''
                                    });
                                }
                                else {
                                    resolve({
                                        result: false,
                                        message: 'Eメールアドレス変更完了のメール送信ができません'
                                    });
                                }
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

    /**
     * IDに該当するユーザのパスワードを変更する
     * @param _changePassword パスワード変更情報
     * @returns パスワード変更結果
     */
    changePassword(_changePassword: IChangePassword): Promise<IChangePasswordResult> {
        return new Promise((resolve, reject) => {
            // ID指定でユーザ情報を取得する
            this.findById(_changePassword.id)
            .then((_user: IUser) => {
                if (!_user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                else {
                    // パスワードを設定する
                    _user.password = this.getPasswordHash(_changePassword.password);
                    // ユーザ情報を保存する
                    this.save(_user)
                    .then((_saveUser: IUser) => {
                        resolve({
                            result: true,
                            message: ''
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

    // パスワードをハッシュ化する
    private getPasswordHash(_password: String) {
        const saltRounds: number = 10;
        const salt: string = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(_password, salt);
    }
}
