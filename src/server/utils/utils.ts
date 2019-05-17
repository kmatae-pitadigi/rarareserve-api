import { IJwtPayload } from '../auth/interfaces/ijwt-payload.interface';
import * as jwt from 'jsonwebtoken';

export class Utils {
    /**
     * contextからサーバー名を取得する
     * @param _context: any context
     * @returns サーバー名
     */
    static getServerName(_url: string): string {
        const urlinfo = new URL(_url);

        let serverName = urlinfo.protocol + '//' + urlinfo.hostname;
        if (urlinfo.port) {
            serverName += ':' + urlinfo.port;
        }

        return serverName;
    }

    /**
     * Eメールアドレスからトークンを作成する
     * @param _email: string Eメールアドレス
     * @returns トークン
     */
    static getTokenByEmail(_email: string, _role: number): string
    {
        // JWTを作成する
        const jwtPayload: IJwtPayload = {
            email: _email,
            role: _role
        };
        const token: string = jwt.sign(jwtPayload,
            Buffer.from(process.env.RSA_PRIVATE_KEY, 'base64'),
            {
                algorithm: 'RS256',
                expiresIn: '7d',
                subject: _email
            });

        return token;
    }

    /**
     * トークンを公開鍵で検証する
     * @param _token トークン
     * @returns payload(undefinedはトークンの有効期間切れ)
     */
    static verifyToken(_token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // JWTを公開鍵で検証する
            jwt.verify(_token,
                        Buffer.from(process.env.RSA_PUBLIC_KEY, 'base64'),
                        {
                            algorithms: ['RS256']
                        },
                        ((err, payload) => {
                            if (err) {
                                if (err.name === 'TokenExpiredError') {
                                    resolve(undefined);
                                }
                                else {
                                    reject(err);
                                }
                            }
                            else {
                                resolve(payload);
                            }
            }));
        });
    }
}
