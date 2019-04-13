"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const signup_service_1 = require("./signup.service");
const signup_dto_1 = require("./dto/signup.dto");
const signup_result_dto_1 = require("./dto/signup-result.dto");
const confirm_user_result_dto_1 = require("./dto/confirm-user-result.dto");
const resend_confirm_mail_result_dto_1 = require("./dto/resend-confirm-mail-result.dto");
const reset_password_dto_1 = require("./dto/reset-password.dto");
const reset_password_result_dto_1 = require("./dto/reset-password-result.dto");
const send_reset_password_mail_result_dto_1 = require("./dto/send-reset-password-mail-result.dto");
const send_reset_password_mail_dto_1 = require("./dto/send-reset-password-mail.dto");
const resend_confirm_mail_dto_1 = require("./dto/resend-confirm-mail.dto");
let SignupResolver = class SignupResolver {
    constructor(signupServiece) {
        this.signupServiece = signupServiece;
    }
    signup(signup, ctx) {
        return new Promise((resolve, reject) => {
            this.signupServiece.signup(signup, ctx.req.headers.origin)
                .then((signupResult) => {
                resolve(signupResult);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    confirmuser(token) {
        return new Promise((resolve, reject) => {
            this.signupServiece.confirmUser(token)
                .then((confirmUserResult) => {
                resolve(confirmUserResult);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    resendconfirmmail(_resendConfirmMail, ctx) {
        return new Promise((resolve, reject) => {
            this.signupServiece.resendConfirmMail(_resendConfirmMail, ctx.req.headers.origin)
                .then((resendConfirmMailResult) => {
                resolve(resendConfirmMailResult);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    resetpassword(resetPassword) {
        return new Promise((resolve, reject) => {
            this.signupServiece.resetPassword(resetPassword)
                .then((resetPasswordResult) => {
                resolve(resetPasswordResult);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    sendresetpasswordmail(_sendResetPasswordMail, ctx) {
        return new Promise((resolve, reject) => {
            this.signupServiece.sendResetPasswordMail(_sendResetPasswordMail, ctx.req.headers.origin)
                .then((sendResetPasswordMail) => {
                resolve(sendResetPasswordMail);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
tslib_1.__decorate([
    graphql_1.Mutation(returns => signup_result_dto_1.SignupResult),
    tslib_1.__param(0, graphql_1.Args('signup')), tslib_1.__param(1, graphql_1.Context()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [signup_dto_1.Signup, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupResolver.prototype, "signup", null);
tslib_1.__decorate([
    graphql_1.Mutation(returns => confirm_user_result_dto_1.ConfirmUserResult),
    tslib_1.__param(0, graphql_1.Args('token')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupResolver.prototype, "confirmuser", null);
tslib_1.__decorate([
    graphql_1.Mutation(returns => resend_confirm_mail_result_dto_1.ResendConfirmMailResult),
    tslib_1.__param(0, graphql_1.Args('resendconfirmmail')), tslib_1.__param(1, graphql_1.Context()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [resend_confirm_mail_dto_1.ResendConfirmMail, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupResolver.prototype, "resendconfirmmail", null);
tslib_1.__decorate([
    graphql_1.Mutation(returns => reset_password_result_dto_1.ResetPasswordResult),
    tslib_1.__param(0, graphql_1.Args('resetPassword')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [reset_password_dto_1.ResetPassword]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupResolver.prototype, "resetpassword", null);
tslib_1.__decorate([
    graphql_1.Mutation(returns => send_reset_password_mail_result_dto_1.SendResetPasswordMailResult),
    tslib_1.__param(0, graphql_1.Args('sendresetpasswordmail')), tslib_1.__param(1, graphql_1.Context()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [send_reset_password_mail_dto_1.SendResetPasswordMail, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SignupResolver.prototype, "sendresetpasswordmail", null);
SignupResolver = tslib_1.__decorate([
    graphql_1.Resolver(of => signup_dto_1.Signup),
    tslib_1.__metadata("design:paramtypes", [signup_service_1.SignupService])
], SignupResolver);
exports.SignupResolver = SignupResolver;
//# sourceMappingURL=signup.resolver.js.map