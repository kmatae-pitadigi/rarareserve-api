import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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
import { ISaveStaffResult } from './interfaces/isave-staff-result.interface';
import { IRemoveStaffResult } from './interfaces/iremove-staff-result.interface';
import { booleanLiteral } from '@babel/types';

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

    /**
     * ユーザを追加する
     * @param _user ユーザ情報
     * @returns 結果
     */
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
                    _user.isemailconfirmed = false;
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
                else if (user.ispasswordreset === false) {
                    resolve({
                        result: false,
                        message: 'パスワードがリセットされていません'
                    });
                }
                // 指定されたパスワードを設定する
                else {
                    user.password = this.getPasswordHash(_password);
                    user.ispasswordreset = false;
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
                    user.isemailconfirmed = false;
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

    /**
     * スタッフ情報を取得する(ロールが管理者かスタッフのユーザ)
     * @returns スタッフ情報(ユーザ情報)
     */
    getStaffAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            this.userRepository.find({
                where: { role: In([1, 2]) },
                order: { kana: 'ASC' }
            })
            .then((_user: User[]) => {
                resolve(_user);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * スタッフ情報を保存する
     * @param _staff スタッフ情報(ユーザ情報)
     * @returns 結果
     */
    saveStaff(_staff: User): Promise<ISaveStaffResult> {
        return new Promise((resolve, reject) => {
            // パスワードをハッシュ化する
            if (_staff.password !== undefined) {
                _staff.password = this.getPasswordHash(_staff.password);
            }
            // Eメール確認フラグがtrueにする
            _staff.isemailconfirmed = true;

            // スタッフ情報を登録する
            this.userRepository.save(_staff)
            .then((result: IUser) => {
                resolve({
                    result: true,
                    message: ''
                });
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * 指定されたスタッフを削除する
     * @param _staff スタッフ情報(ユーザ情報)
     */
    removeStaff(_staff: IUser): Promise<IRemoveStaffResult> {
        return new Promise((resolve, reject) => {
            let remove: boolean = true;
            // 指定スタッフが管理者だった場合
            if (_staff.role === 2) {
                // 管理者ユーザ数を取得する
                this.userRepository.createQueryBuilder('user')
                .select('user.id')
                .where('user.role = 2')
                .getCount()
                .then((_count: number) => {
                    // 管理者が1名だったらエラーにする
                    if (_count === 1) {
                        remove = false;
                        resolve({
                            result: false,
                            message: '管理者が1名のみのため削除できません'
                        });
                    }
                    else {
                        // スタッフ情報を削除する
                        this.userRepository.remove(_staff)
                        .then((_user: IUser) => {
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
                    remove = false;
                    reject(err);
                });
            }
             // 普通のスタッフの場合は削除する
             else {
                // スタッフ情報を削除する
                this.userRepository.remove(_staff)
                .then((_user: IUser) => {
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
    }
}
