import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { booleanLiteral } from '@babel/types';

@Injectable()
export class AdminAuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const request = context.switchToHttp().getRequest();
            const user = request.user;

            resolve(true);
        });
    }
}