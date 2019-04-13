"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const user_1 = require("./user");
const user_service_1 = require("./user.service");
const common_1 = require("@nestjs/common");
const gqlauthguard_1 = require("../guards/gqlauthguard");
const change_email_dto_1 = require("./dto/change-email.dto");
const change_email_result_dto_1 = require("./dto/change-email-result.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const change_password_result_dto_1 = require("./dto/change-password-result.dto");
const change_profile_dto_1 = require("./dto/change-profile.dto");
const change_profile_result_dto_1 = require("./dto/change-profile-result.dto");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    user(_email) {
        return new Promise((resolve, reject) => {
            this.userService.findByEmail(_email)
                .then((user) => {
                resolve(user);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    changeemail(_changeemail, ctx) {
        return new Promise((resolve, reject) => {
            this.userService.changeEmail(_changeemail, ctx.req.headers.origin)
                .then((_changeMailResult) => {
                resolve(_changeMailResult);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    changepassword(_changePassword) {
        return new Promise((resolve, reject) => {
            this.userService.changePassword(_changePassword)
                .then((_changePasswordResult) => {
                resolve(_changePasswordResult);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    changeprofile(_changeProfile) {
        return new Promise((resolve, reject) => {
            this.userService.changeProfile(_changeProfile)
                .then((_changeProfileResult) => {
                resolve(_changeProfileResult);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
tslib_1.__decorate([
    graphql_1.Query(returns => user_1.User),
    common_1.UseGuards(gqlauthguard_1.GqlAuthGuard),
    tslib_1.__param(0, graphql_1.Args('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
tslib_1.__decorate([
    graphql_1.Mutation(returns => change_email_result_dto_1.ChangeEmailResult),
    common_1.UseGuards(gqlauthguard_1.GqlAuthGuard),
    tslib_1.__param(0, graphql_1.Args('changeemail')), tslib_1.__param(1, graphql_1.Context()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [change_email_dto_1.ChangeEmail, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "changeemail", null);
tslib_1.__decorate([
    graphql_1.Mutation(returns => change_password_result_dto_1.ChangePasswordResult),
    common_1.UseGuards(gqlauthguard_1.GqlAuthGuard),
    tslib_1.__param(0, graphql_1.Args('changepassword')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [change_password_dto_1.ChangePassword]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "changepassword", null);
tslib_1.__decorate([
    graphql_1.Mutation(returns => change_profile_result_dto_1.ChangeProfileResult),
    common_1.UseGuards(gqlauthguard_1.GqlAuthGuard),
    tslib_1.__param(0, graphql_1.Args('changeprofile')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [change_profile_dto_1.ChangeProfile]),
    tslib_1.__metadata("design:returntype", Promise)
], UserResolver.prototype, "changeprofile", null);
UserResolver = tslib_1.__decorate([
    graphql_1.Resolver(of => user_1.User),
    tslib_1.__metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.resolver.js.map