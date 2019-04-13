import { Injectable } from '@nestjs/common';
import { ISigninResult } from './interfaces/isignin-result.interface';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class SigninService {
    constructor(
        private readonly authService: AuthService
    ) {}

    signin(_email: string, _password: string): Promise<ISigninResult>
    {
        return new Promise((resolve, reject) => {
            this.authService.auth(_email, _password)
            .then((signinResult: ISigninResult) => {
                resolve(signinResult);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
