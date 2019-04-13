"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const user_module_1 = require("./user/user.module");
const user_1 = require("./user/user");
const signin_module_1 = require("./signin/signin.module");
const email_module_1 = require("./email/email.module");
const signup_module_1 = require("./signup/signup.module");
const env_module_1 = require("./env/env.module");
const auth_module_1 = require("./auth/auth.module");
const site_config_module_1 = require("./site-config/site-config.module");
const site_config_1 = require("./site-config/site-config");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            env_module_1.EnvModule,
            signin_module_1.SigninModule,
            signup_module_1.SignupModule,
            auth_module_1.AuthModule,
            graphql_1.GraphQLModule.forRoot({
                installSubscriptionHandlers: true,
                autoSchemaFile: 'schema.gql',
                context: ({ req }) => ({ req }),
                playground: (process.env.NODE_ENV || 'development') === 'development',
                debug: (process.env.NODE_ENV || 'development') === 'development',
                tracing: (process.env.NODE_ENV || 'development') === 'development'
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mssql',
                url: process.env.DATABASE_URL,
                logging: process.env.NODE_ENV === 'development',
                migrationsRun: true,
                migrations: [__dirname + '/../db/migrations/**/*.js'],
                entities: [
                    user_1.User,
                    site_config_1.SiteConfig
                ]
            }),
            user_module_1.UserModule,
            email_module_1.EmailModule,
            site_config_module_1.SiteConfigModule
        ],
        providers: [],
        controllers: []
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map