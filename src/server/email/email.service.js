"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const sgmail = require("@sendgrid/mail");
const fs = require("fs");
const utils_1 = require("../utils/utils");
const site_config_service_1 = require("../site-config/site-config.service");
let EmailService = class EmailService {
    constructor(siteConfigService) {
        this.siteConfigService = siteConfigService;
    }
    /**
     * メールを送信する
     * @param templateName テンプレートファイル名
     * @param toemail メール送信先
     * @param opts メール送信オプション
     * @returns true:正常
     */
    sendMail(templateName, toemail, opts) {
        return new Promise((resolve, reject) => {
            // Eメールテンプレートを読み込む
            fs.readFile(__dirname + '/assets/' + templateName + '.txt', 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    // オプションの指定に沿ってテンプレート文字列を置換する
                    if (opts) {
                        // サービス名を置換する
                        if (opts.servicename) {
                            data = data.replace(/##servicename##/g, opts.servicename);
                        }
                        // 確認用URLを置換する
                        if (opts.confirmurl) {
                            data = data.replace(/##confirmurl##/g, opts.confirmurl);
                        }
                        // URLを置換する
                        if (opts.url) {
                            data = data.replace(/##url##/g, opts.url);
                        }
                        // メールアドレスを置換する
                        if (opts.email) {
                            data = data.replace(/##email##/g, opts.email);
                        }
                    }
                    // SENDGRID_API_KEYを設定する
                    sgmail.setApiKey(process.env.SENDGRID_API_KEY);
                    // 送信するメールの内容を設定する
                    const msg = {
                        to: toemail,
                        from: opts.email,
                        subject: '【' + opts.servicename + '】からのお知らせ',
                        text: data
                    };
                    // メールを送信する
                    sgmail.send(msg)
                        .then((req) => {
                        resolve(true);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
                resolve(true);
            });
        });
    }
    /**
     * メールでトークンを送信する
     * @param _format メールフォーマット名
     * @param _path 認証パス名
     * @param _email 送信先メールアドレス
     * @param _url 要求元URL
     * @returns true:成功
     */
    sendTokenMail(_format, _path, _email, _url) {
        return new Promise((resolve, reject) => {
            // JWTを作成する
            const token = utils_1.Utils.getTokenByEmail(_email);
            // サーバー名を取得する
            const serverName = utils_1.Utils.getServerName(_url);
            // サイト設定情報を取得する
            this.siteConfigService.getSiteConfig()
                .then((_siteConfig) => {
                // メール確認用のメールを送る
                const opts = {
                    servicename: _siteConfig.name,
                    confirmurl: serverName + '/' + _path + '/' + token,
                    url: serverName,
                    email: _siteConfig.email
                };
                this.sendMail(_format, _email, opts)
                    .then((result) => {
                    resolve(true);
                })
                    .catch((err) => {
                    reject(err);
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
EmailService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [site_config_service_1.SiteConfigService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map