import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { IAuthResult } from './interfaces/iauth-result.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../user/interfaces/iuser.interface';
import { SignOptions } from 'jsonwebtoken';
import { IJwtPayload } from './interfaces/ijwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    auth(_email: string, _password: string): Promise<IAuthResult> {
        return new Promise((resolve, reject) => {
            // Eメールアドレスでユーザを検索する
            this.userService.findByEmail(_email)
            .then((user: IUser) => {
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
                        const match: boolean = bcrypt.compareSync(_password, user.password);
                        if (match === true)
                        {
                            // JWTを作成する
                            const jwtPayload: IJwtPayload = {
                                email: _email,
                                role: user.role
                            };
                            const signopt: SignOptions = {
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
                        else
                        {
                            resolve({
                                result: false,
                                message: 'Eメールアドレスまたはパスワードが違います。',
                                token: ''
                            });
                        }
                    }
                }
            })
            .catch((err: any) => {
                reject(err);
            });
        });
    }
}
