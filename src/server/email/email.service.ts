import { Injectable } from '@nestjs/common';
import * as sgmail from '@sendgrid/mail';
import { IEmailOptions } from './interfaces/iemail-options.interface';
import * as fs from 'fs';
import { Utils } from '../utils/utils';
import { SiteConfigService } from '../site-config/site-config.service';
import { ISiteConfig } from '../site-config/interfaces/isite-config.interface';

@Injectable()
export class EmailService {
    constructor(
        private readonly siteConfigService: SiteConfigService
    ) {}

    /**
     * メールを送信する
     * @param template メールテンプレート
     * @param toemail メール送信先
     * @param opts メール送信オプション
     * @returns true:正常
     */
    private sendMail(template: string, toemail: string, opts?: IEmailOptions): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let data: string = template;
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
                text: data,
                customArgs: {
                    servicename: ''
                }
            };

            // カスタム引数にサービス名を設定する
            if (opts.servicename) {
                msg.customArgs.servicename = opts.servicename;
            }

            // メールを送信する
            sgmail.send(msg)
            .then((req) => {
                resolve(true);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * メールでトークンを送信する
     * @param _format メールフォーマット
     * @param _path 認証パス名
     * @param _email 送信先メールアドレス
     * @param _url 要求元URL
     * @param _role ユーザ権限
     * @returns true:成功
     */
    sendTokenMail(_format: string, _path: string, _email: string, _url: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // JWTを作成する
            const token = Utils.getTokenByEmail(_email, 0);

            // サーバー名を取得する
            const serverName: string = Utils.getServerName(_url);

            // サイト設定情報を取得する
            this.siteConfigService.get()
            .then((_siteConfig: ISiteConfig) => {
                // メール確認用のメールを送る
                const opts: IEmailOptions = {
                    servicename: _siteConfig.sitename,
                    confirmurl: serverName + '/' + _path + '/' + token,
                    url: serverName,
                    email: _siteConfig.email
                };
                this.sendMail(_format, _email, opts)
                .then((result: boolean) => {
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
}
