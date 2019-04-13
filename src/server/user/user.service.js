"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_1 = require("./user");
const email_service_1 = require("../email/email.service");
let UserService = class UserService {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    // 指定されたEメールアドレスのユーザを検索する
    findByEmail(_email) {
        return new Promise((resolve, reject) => {
            this.userRepository.findOne({ where: { email: _email } })
                .then((user) => {
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
    findById(_id) {
        return new Promise((resolve, reject) => {
            this.userRepository.findOne(_id)
                .then((user) => {
                resolve(user);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    // ユーザを追加する
    add(signup) {
        return new Promise((resolve, reject) => {
            this.findByEmail(signup.email)
                .then((user) => {
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
                    // ユーザ情報を設定する
                    const addUser = new user_1.User();
                    addUser.name = signup.name;
                    addUser.kana = signup.kana;
                    addUser.email = signup.email;
                    addUser.postcode = signup.postcode;
                    addUser.address = signup.address;
                    addUser.phone = signup.phone;
                    // パスワードはハッシュ化する
                    addUser.password = this.getPasswordHash(signup.password);
                    // Eメール確認フラグは1に設定する
                    addUser.isemailconfirmed = 1;
                    // ユーザ情報を登録する
                    this.userRepository.save(addUser)
                        .then((result) => {
                        resolve({
                            result: 0,
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
    // ユーザ情報を更新する
    save(_user) {
        return new Promise((resolve, reject) => {
            this.userRepository.save(_user)
                .then((user) => {
                resolve(user);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    resetPassword(_email, _password) {
        return new Promise((resolve, reject) => {
            // ユーザ情報を取得する
            this.findByEmail(_email)
                .then((user) => {
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
                        .then((resetUser) => {
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
    changeEmail(_changeEmail, _url) {
        return new Promise((resolve, reject) => {
            // IDに該当するユーザ情報を取得する
            this.findById(_changeEmail.id)
                .then((user) => {
                if (!user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                else {
                    // Eメールアドレスを変更する
                    user.email = _changeEmail.email;
                    // 登録完了フラグを1にする
                    user.isemailconfirmed = 1;
                    this.save(user)
                        .then((_saveUser) => {
                        this.emailService.sendTokenMail('changeemailconfirm', 'verifytoken', _saveUser.email, _url)
                            .then((result) => {
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
    changePassword(_changePassword) {
        return new Promise((resolve, reject) => {
            // ID指定でユーザ情報を取得する
            this.findById(_changePassword.id)
                .then((_user) => {
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
                        .then((_saveUser) => {
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
    /**
     * IDに合致するユーザのプロファイルを変更する
     * @param _changeProfile プロファイル情報
     * @returns プロファイル変更結果
     */
    changeProfile(_changeProfile) {
        return new Promise((resolve, reject) => {
            // IDに該当するユーザ情報を取得する
            this.findById(_changeProfile.id)
                .then((_user) => {
                if (!_user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                else {
                    // ユーザ情報を設定する
                    _user.name = _changeProfile.name;
                    _user.kana = _changeProfile.kana;
                    _user.postcode = _changeProfile.postcode;
                    _user.address = _changeProfile.address;
                    _user.phone = _changeProfile.phone;
                    _user.role = _changeProfile.role;
                    _user.sex = _changeProfile.sex;
                    // ユーザ情報を保存する
                    this.save(_user)
                        .then((_saveUser) => {
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
    // パスワードをハッシュ化する
    getPasswordHash(_password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(_password, salt);
    }
};
UserService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(user_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map