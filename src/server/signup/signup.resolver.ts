import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { SignupService } from './signup.service';
import { Signup } from './dto/signup.dto';
import { SignupResult } from './dto/signup-result.dto';
import { ConfirmUserResult } from './dto/confirm-user-result.dto';
import { ResendConfirmMailResult } from './dto/resend-confirm-mail-result.dto';
import { ResetPassword } from './dto/reset-password.dto';
import { ResetPasswordResult } from './dto/reset-password-result.dto';
import { SendResetPasswordMailResult } from './dto/send-reset-password-mail-result.dto';
import { SendResetPasswordMail } from './dto/send-reset-password-mail.dto';
import { ResendConfirmMail } from './dto/resend-confirm-mail.dto';

@Resolver(of => Signup)
export class SignupResolver {
    constructor(
        private readonly signupServiece: SignupService
    ) {}

    @Mutation(returns => SignupResult)
    signup(@Args('signup') signup: Signup, @Context() ctx: any): Promise<SignupResult> {
        return new Promise((resolve, reject) => {
            this.signupServiece.signup(signup, ctx.req.headers.origin)
            .then((signupResult: SignupResult) => {
                resolve(signupResult);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Mutation(returns => ConfirmUserResult)
    confirmuser(@Args('token') token: string): Promise<ConfirmUserResult> {
        return new Promise((resolve, reject) => {
            this.signupServiece.confirmUser(token)
            .then((confirmUserResult: ConfirmUserResult) => {
                resolve(confirmUserResult);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Mutation(returns => ResendConfirmMailResult)
    resendconfirmmail(@Args('resendconfirmmail') _resendConfirmMail: ResendConfirmMail, @Context() ctx: any): Promise<ResendConfirmMailResult> {
        return new Promise((resolve, reject) => {
            this.signupServiece.resendConfirmMail(_resendConfirmMail, ctx.req.headers.origin)
            .then((resendConfirmMailResult: ResendConfirmMailResult) => {
                resolve(resendConfirmMailResult);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Mutation(returns => ResetPasswordResult)
    resetpassword(@Args('resetPassword') resetPassword: ResetPassword): Promise<ResetPasswordResult> {
        return new Promise((resolve, reject) => {
            this.signupServiece.resetPassword(resetPassword)
            .then((resetPasswordResult: ResetPasswordResult) => {
                resolve(resetPasswordResult);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Mutation(returns => SendResetPasswordMailResult)
    sendresetpasswordmail(@Args('sendresetpasswordmail') _sendResetPasswordMail: SendResetPasswordMail, @Context() ctx: any): Promise<SendResetPasswordMailResult> {
        return new Promise((resolve, reject) => {
            this.signupServiece.sendResetPasswordMail(_sendResetPasswordMail, ctx.req.headers.origin)
            .then((sendResetPasswordMail: SendResetPasswordMailResult) => {
                resolve(sendResetPasswordMail);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
