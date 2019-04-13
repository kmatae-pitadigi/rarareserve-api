"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const graphql_1 = require("@nestjs/graphql");
const signin_service_1 = require("./signin.service");
const signin_dto_1 = require("./dto/signin.dto");
const signin_result_dto_1 = require("./dto/signin-result.dto");
let SigninResolver = class SigninResolver {
    constructor(signinService) {
        this.signinService = signinService;
    }
    signin(_signin) {
        return new Promise((resolve, reject) => {
            this.signinService.signin(_signin.email, _signin.password)
                .then((signinResult) => {
                resolve(signinResult);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
tslib_1.__decorate([
    graphql_1.Mutation(returns => signin_result_dto_1.SigninResult),
    tslib_1.__param(0, graphql_1.Args('signin')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [signin_dto_1.Signin]),
    tslib_1.__metadata("design:returntype", Promise)
], SigninResolver.prototype, "signin", null);
SigninResolver = tslib_1.__decorate([
    graphql_1.Resolver(of => signin_dto_1.Signin),
    tslib_1.__metadata("design:paramtypes", [signin_service_1.SigninService])
], SigninResolver);
exports.SigninResolver = SigninResolver;
//# sourceMappingURL=signin.resolver.js.map