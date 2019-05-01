import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from '../auth/interfaces/ijwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // SetMetadataのrolesに定義されたロール値を取得する
            const roles = this.reflector.get<number[]>('roles', context.getHandler());
            // ロール値が取得できなければtrue（つまり、ガードされていない)
            if (!roles) {
                resolve(true);
            }
            else {
                // contextからGraphQLのctxを取得する
                // GraphQLのforRootで「context: ({ req }) => ({ req }),」の定義が必要
                const ctx = GqlExecutionContext.create(context);
                const req = ctx.getContext().req;
                // authorizationヘッダーからJWTトークンを取得する
                const authToken = req.headers.authorization;
                const jwtToken = authToken.substring(authToken.indexOf(' ') + 1);
                // JWTトークンを公開鍵で検証する
                jwt.verify(jwtToken, Buffer.from(process.env.RSA_PUBLIC_KEY, 'base64'), (err, payload: IJwtPayload) => {
                    // JWTトークンの検証ができなかったらエラー
                    if (err) {
                        reject(err);
                    }
                    else {
                        // ユーザのロールがGuardで設定されているロールに合致するかを検証する
                        resolve(roles.includes(payload.role));
                    }
                });
            }
        });
    }
}