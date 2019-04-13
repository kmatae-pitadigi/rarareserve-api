"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const graphql_1 = require("@nestjs/graphql");
const env_service_1 = require("./env.service");
const env_result_dto_1 = require("./dto/env-result.dto");
let EnvResolver = class EnvResolver {
    constructor(envService) {
        this.envService = envService;
    }
    env(id) {
        return new Promise((resolve, reject) => {
            this.envService.getEnv()
                .then((envResult) => {
                resolve(envResult);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
tslib_1.__decorate([
    graphql_1.Query(returns => env_result_dto_1.EnvResult),
    tslib_1.__param(0, graphql_1.Args('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], EnvResolver.prototype, "env", null);
EnvResolver = tslib_1.__decorate([
    graphql_1.Resolver(of => env_result_dto_1.EnvResult),
    tslib_1.__metadata("design:paramtypes", [env_service_1.EnvService])
], EnvResolver);
exports.EnvResolver = EnvResolver;
//# sourceMappingURL=env.resolver.js.map