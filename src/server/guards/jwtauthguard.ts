import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from '../auth/interfaces/ijwt-payload.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }

    canActivate(context: ExecutionContext): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const req = this.getRequest(context);

            // AuthorizationヘッダーがなければOK
            if (!req.headers.authorization) {
                resolve(false);
            }
            else {
                // GraphQLのvaliablesがなければOK
                if (!req.body.variables) {
                    resolve(true);
                }
                else {
                    const val = req.body.variables;
                    // Eメール項目がなければOK
                    if (!val.email) {
                        resolve(true);
                    }
                    else {
                        // JWTを取得する
                        const jwtToken = req.headers.authorization.substring(req.headers.authorization.indexOf(' ') + 1);
                        // JWTトークンを公開鍵で検証する
                        jwt.verify(jwtToken, Buffer.from(process.env.RSA_PUBLIC_KEY, 'base64'), (err, payload: IJwtPayload) => {
                            // JWTトークンの検証ができなかったらエラー
                            if (err) {
                                resolve(false);
                            }
                            else {
                                // JWTのEメールとreqのEメールが一致すればOK
                                resolve(payload.email === val.email);
                            }
                        });
                    }
                }
            }
        });
    }
}
