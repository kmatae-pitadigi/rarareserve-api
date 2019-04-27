import 'reflect-metadata';
import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { SigninService } from './signin.service';
import { Signin } from './dto/signin.dto';
import { SigninResult } from './dto/signin-result.dto';

@Resolver(of => Signin)
export class SigninResolver {
    constructor(
        private readonly signinService: SigninService
    ) {}

    @Mutation(returns => SigninResult)
    signin(@Args('signin') _signin: Signin): Promise<SigninResult> {
        return new Promise((resolve, reject) => {
            this.signinService.signin(_signin.email, _signin.password)
            .then((signinResult: SigninResult) => {
                resolve(signinResult);
            })
            .catch((err: any) => {
                reject(err);
            });
        });
    }
}
