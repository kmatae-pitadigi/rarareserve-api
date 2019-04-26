/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/server/app.module.ts":
/*!**********************************!*\
  !*** ./src/server/app.module.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const user_module_1 = __webpack_require__(/*! ./user/user.module */ "./src/server/user/user.module.ts");
const user_1 = __webpack_require__(/*! ./user/user */ "./src/server/user/user.ts");
const signin_module_1 = __webpack_require__(/*! ./signin/signin.module */ "./src/server/signin/signin.module.ts");
const email_module_1 = __webpack_require__(/*! ./email/email.module */ "./src/server/email/email.module.ts");
const signup_module_1 = __webpack_require__(/*! ./signup/signup.module */ "./src/server/signup/signup.module.ts");
const auth_module_1 = __webpack_require__(/*! ./auth/auth.module */ "./src/server/auth/auth.module.ts");
const site_config_module_1 = __webpack_require__(/*! ./site-config/site-config.module */ "./src/server/site-config/site-config.module.ts");
const site_config_1 = __webpack_require__(/*! ./site-config/site-config */ "./src/server/site-config/site-config.ts");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            signin_module_1.SigninModule,
            signup_module_1.SignupModule,
            auth_module_1.AuthModule,
            site_config_module_1.SiteConfigModule,
            graphql_1.GraphQLModule.forRoot({
                installSubscriptionHandlers: true,
                autoSchemaFile: 'schema.gql',
                context: ({ req }) => ({ req }),
                playground: ("development" || false) === 'development',
                debug: ("development" || false) === 'development',
                tracing: ("development" || false) === 'development'
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mssql',
                host: process.env.DATABASE_HOST,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                port: parseInt(process.env.DATABASE_PORT, 10),
                database: process.env.DATABASE_DATABASE,
                extra: {
                    options: {
                        encrypt: process.env.DATABASE_ENCRYPT === 'yes'
                    }
                },
                logging: "development" === 'development',
                migrationsRun: true,
                migrations: [__dirname + '/../db/migrations/**/*.js'],
                entities: [
                    user_1.User,
                    site_config_1.SiteConfig
                ]
            }),
            user_module_1.UserModule,
            email_module_1.EmailModule
        ],
        providers: [],
        controllers: []
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./src/server/auth/auth.module.ts":
/*!****************************************!*\
  !*** ./src/server/auth/auth.module.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ./auth.service */ "./src/server/auth/auth.service.ts");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const jwt_strategy_1 = __webpack_require__(/*! ./strategies/jwt-strategy */ "./src/server/auth/strategies/jwt-strategy.ts");
const user_module_1 = __webpack_require__(/*! ../user/user.module */ "./src/server/user/user.module.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secretOrPrivateKey: Buffer.from(process.env.RSA_PRIVATE_KEY, 'base64'),
                signOptions: {
                    algorithm: 'RSA256',
                    expiresIn: '24h'
                }
            }),
            user_module_1.UserModule
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy
        ],
        exports: [
            auth_service_1.AuthService
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./src/server/auth/auth.service.ts":
/*!*****************************************!*\
  !*** ./src/server/auth/auth.service.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_1 = __webpack_require__(/*! ../user/user.service */ "./src/server/user/user.service.ts");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    auth(_email, _password) {
        return new Promise((resolve, reject) => {
            // Eメールアドレスでユーザを検索する
            this.userService.findByEmail(_email)
                .then((user) => {
                // Eメールアドレスでユーザがヒットしなければundefined
                if (user === undefined) {
                    resolve({
                        result: false,
                        message: 'Eメールアドレスまたはパスワードが違います。',
                        token: ''
                    });
                }
                else {
                    // Eメールの確認が未完了ならエラーにする
                    if (!user.isemailconfirmed) {
                        resolve({
                            result: false,
                            message: '登録が完了していません。お送りした登録完了メールで登録を完了させてください。',
                            token: ''
                        });
                    }
                    else {
                        // パスワードが一致するかをチェックする
                        const match = bcrypt.compareSync(_password, user.password);
                        if (match === true) {
                            // JWTを作成する
                            const jwtPayload = { email: _email };
                            const signopt = {
                                algorithm: 'RS256',
                                expiresIn: '24h',
                                subject: _email
                            };
                            resolve({
                                result: true,
                                message: '',
                                token: this.jwtService.sign(jwtPayload, signopt)
                            });
                        }
                        else {
                            resolve({
                                result: false,
                                message: 'Eメールアドレスまたはパスワードが違います。',
                                token: ''
                            });
                        }
                    }
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
AuthService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;


/***/ }),

/***/ "./src/server/auth/strategies/jwt-strategy.ts":
/*!****************************************************!*\
  !*** ./src/server/auth/strategies/jwt-strategy.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
const user_service_1 = __webpack_require__(/*! ../../user/user.service */ "./src/server/user/user.service.ts");
let JwtStrategy = class JwtStrategy extends passport_1.PassportStrategy(passport_jwt_1.Strategy) {
    constructor(userService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Buffer.from(process.env.RSA_PUBLIC_KEY, 'base64')
        });
        this.userService = userService;
    }
    validate(payload) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.findByEmail(payload.email);
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            return user;
        });
    }
};
JwtStrategy = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [user_service_1.UserService])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;


/***/ }),

/***/ "./src/server/email/email.module.ts":
/*!******************************************!*\
  !*** ./src/server/email/email.module.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const email_service_1 = __webpack_require__(/*! ./email.service */ "./src/server/email/email.service.ts");
const site_config_module_1 = __webpack_require__(/*! ../site-config/site-config.module */ "./src/server/site-config/site-config.module.ts");
let EmailModule = class EmailModule {
};
EmailModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            site_config_module_1.SiteConfigModule
        ],
        providers: [
            email_service_1.EmailService
        ],
        controllers: [],
        exports: [
            email_service_1.EmailService
        ]
    })
], EmailModule);
exports.EmailModule = EmailModule;


/***/ }),

/***/ "./src/server/email/email.service.ts":
/*!*******************************************!*\
  !*** ./src/server/email/email.service.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const sgmail = __webpack_require__(/*! @sendgrid/mail */ "@sendgrid/mail");
const fs = __webpack_require__(/*! fs */ "fs");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./src/server/utils/utils.ts");
const site_config_service_1 = __webpack_require__(/*! ../site-config/site-config.service */ "./src/server/site-config/site-config.service.ts");
let EmailService = class EmailService {
    constructor(siteConfigService) {
        this.siteConfigService = siteConfigService;
    }
    /**
     * メールを送信する
     * @param templateName テンプレートファイル名
     * @param toemail メール送信先
     * @param opts メール送信オプション
     * @returns true:正常
     */
    sendMail(templateName, toemail, opts) {
        return new Promise((resolve, reject) => {
            // Eメールテンプレートを読み込む
            fs.readFile(__dirname + '/assets/' + templateName + '.txt', 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    // オプションの指定に沿ってテンプレート文字列を置換する
                    if (opts) {
                        // サービス名を置換する
                        if (opts.servicename) {
                            data = data.replace(/##servicename##/g, opts.servicename);
                        }
                        // 確認用URLを置換する
                        if (opts.confirmurl) {
                            data = data.replace(/##confirmurl##/g, opts.confirmurl);
                        }
                        // URLを置換する
                        if (opts.url) {
                            data = data.replace(/##url##/g, opts.url);
                        }
                        // メールアドレスを置換する
                        if (opts.email) {
                            data = data.replace(/##email##/g, opts.email);
                        }
                    }
                    // SENDGRID_API_KEYを設定する
                    sgmail.setApiKey(process.env.SENDGRID_API_KEY);
                    // 送信するメールの内容を設定する
                    const msg = {
                        to: toemail,
                        from: opts.email,
                        subject: '【' + opts.servicename + '】からのお知らせ',
                        text: data
                    };
                    // メールを送信する
                    sgmail.send(msg)
                        .then((req) => {
                        resolve(true);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
                resolve(true);
            });
        });
    }
    /**
     * メールでトークンを送信する
     * @param _format メールフォーマット名
     * @param _path 認証パス名
     * @param _email 送信先メールアドレス
     * @param _url 要求元URL
     * @returns true:成功
     */
    sendTokenMail(_format, _path, _email, _url) {
        return new Promise((resolve, reject) => {
            // JWTを作成する
            const token = utils_1.Utils.getTokenByEmail(_email);
            // サーバー名を取得する
            const serverName = utils_1.Utils.getServerName(_url);
            // サイト設定情報を取得する
            this.siteConfigService.get()
                .then((_siteConfig) => {
                // メール確認用のメールを送る
                const opts = {
                    servicename: _siteConfig.name,
                    confirmurl: serverName + '/' + _path + '/' + token,
                    url: serverName,
                    email: _siteConfig.email
                };
                this.sendMail(_format, _email, opts)
                    .then((result) => {
                    resolve(true);
                })
                    .catch((err) => {
                    reject(err);
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
EmailService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [site_config_service_1.SiteConfigService])
], EmailService);
exports.EmailService = EmailService;


/***/ }),

/***/ "./src/server/guards/gqlauthguard.ts":
/*!*******************************************!*\
  !*** ./src/server/guards/gqlauthguard.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
let GqlAuthGuard = class GqlAuthGuard extends passport_1.AuthGuard('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
};
GqlAuthGuard = tslib_1.__decorate([
    common_1.Injectable()
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;


/***/ }),

/***/ "./src/server/init.data.setup.ts":
/*!***************************************!*\
  !*** ./src/server/init.data.setup.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const user_1 = __webpack_require__(/*! ./user/user */ "./src/server/user/user.ts");
const site_config_1 = __webpack_require__(/*! ./site-config/site-config */ "./src/server/site-config/site-config.ts");
class InitDataSetup {
    setup() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.Initialize1554538980430();
        });
    }
    Initialize1554538980430() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // 管理者ユーザを追加する
            const userRepository = typeorm_1.getRepository(user_1.User);
            const user = yield userRepository.findOne({ where: { email: 'admin@local' } });
            if (!user) {
                const addUser = new user_1.User();
                addUser.name = 'サイト管理者';
                addUser.kana = 'サイトカンリシャ';
                addUser.email = 'admin@local';
                addUser.postcode = '000-0000';
                addUser.address = 'なし';
                addUser.phone = '000-000-0000';
                addUser.password = '$2b$10$J9TKmVGfeujQ0q06kjQ54.pK.8OLm0CVSmpMEVK5uDys9tJMQWutu';
                addUser.role = 2;
                addUser.ispasswordreset = 0;
                addUser.isemailconfirmed = 1;
                addUser.sex = 0;
                userRepository.save(addUser);
            }
            // サイト情報を追加する
            const siteConfigRepository = typeorm_1.getRepository(site_config_1.SiteConfig);
            const siteconfig = yield siteConfigRepository.findOne(1);
            if (!siteconfig) {
                const addSiteConfig = new site_config_1.SiteConfig();
                addSiteConfig.id = 1;
                addSiteConfig.name = 'スキッズキャンプ予約サイト';
                addSiteConfig.email = 'admin@local';
                siteConfigRepository.save(addSiteConfig);
            }
            console.info('InitDataSetup: Initialize1554538980430 done');
        });
    }
}
exports.InitDataSetup = InitDataSetup;


/***/ }),

/***/ "./src/server/main.ts":
/*!****************************!*\
  !*** ./src/server/main.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const helmet = __webpack_require__(/*! helmet */ "helmet");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/server/app.module.ts");
const init_data_setup_1 = __webpack_require__(/*! ./init.data.setup */ "./src/server/init.data.setup.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.use(helmet());
        // 初期値を設定する
        const initDataSetup = new init_data_setup_1.InitDataSetup();
        initDataSetup.setup();
        const port = parseInt(process.env.PORT, 10) || 3000;
        console.info('rarareserver-api started: NODE_ENV: ' + "development" + ', PORT: ' + port);
        yield app.listen(port);
    });
}
bootstrap();


/***/ }),

/***/ "./src/server/signin/dto/signin-result.dto.ts":
/*!****************************************************!*\
  !*** ./src/server/signin/dto/signin-result.dto.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let SigninResult = class SigninResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], SigninResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SigninResult.prototype, "message", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SigninResult.prototype, "token", void 0);
SigninResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], SigninResult);
exports.SigninResult = SigninResult;


/***/ }),

/***/ "./src/server/signin/dto/signin.dto.ts":
/*!*********************************************!*\
  !*** ./src/server/signin/dto/signin.dto.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let Signin = class Signin {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signin.prototype, "email", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signin.prototype, "password", void 0);
Signin = tslib_1.__decorate([
    type_graphql_1.InputType()
], Signin);
exports.Signin = Signin;


/***/ }),

/***/ "./src/server/signin/signin.module.ts":
/*!********************************************!*\
  !*** ./src/server/signin/signin.module.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const signin_service_1 = __webpack_require__(/*! ./signin.service */ "./src/server/signin/signin.service.ts");
const signin_resolver_1 = __webpack_require__(/*! ./signin.resolver */ "./src/server/signin/signin.resolver.ts");
const auth_module_1 = __webpack_require__(/*! ../auth/auth.module */ "./src/server/auth/auth.module.ts");
let SigninModule = class SigninModule {
};
SigninModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule
        ],
        providers: [
            signin_service_1.SigninService,
            signin_resolver_1.SigninResolver
        ],
        controllers: [],
        exports: []
    })
], SigninModule);
exports.SigninModule = SigninModule;


/***/ }),

/***/ "./src/server/signin/signin.resolver.ts":
/*!**********************************************!*\
  !*** ./src/server/signin/signin.resolver.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const signin_service_1 = __webpack_require__(/*! ./signin.service */ "./src/server/signin/signin.service.ts");
const signin_dto_1 = __webpack_require__(/*! ./dto/signin.dto */ "./src/server/signin/dto/signin.dto.ts");
const signin_result_dto_1 = __webpack_require__(/*! ./dto/signin-result.dto */ "./src/server/signin/dto/signin-result.dto.ts");
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


/***/ }),

/***/ "./src/server/signin/signin.service.ts":
/*!*********************************************!*\
  !*** ./src/server/signin/signin.service.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const auth_service_1 = __webpack_require__(/*! ../auth/auth.service */ "./src/server/auth/auth.service.ts");
let SigninService = class SigninService {
    constructor(authService) {
        this.authService = authService;
    }
    signin(_email, _password) {
        return new Promise((resolve, reject) => {
            this.authService.auth(_email, _password)
                .then((signinResult) => {
                resolve(signinResult);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
SigninService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [auth_service_1.AuthService])
], SigninService);
exports.SigninService = SigninService;


/***/ }),

/***/ "./src/server/signup/dto/confirm-user-result.dto.ts":
/*!**********************************************************!*\
  !*** ./src/server/signup/dto/confirm-user-result.dto.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let ConfirmUserResult = class ConfirmUserResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ConfirmUserResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ConfirmUserResult.prototype, "message", void 0);
ConfirmUserResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], ConfirmUserResult);
exports.ConfirmUserResult = ConfirmUserResult;


/***/ }),

/***/ "./src/server/signup/dto/resend-confirm-mail-result.dto.ts":
/*!*****************************************************************!*\
  !*** ./src/server/signup/dto/resend-confirm-mail-result.dto.ts ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let ResendConfirmMailResult = class ResendConfirmMailResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ResendConfirmMailResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ResendConfirmMailResult.prototype, "message", void 0);
ResendConfirmMailResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], ResendConfirmMailResult);
exports.ResendConfirmMailResult = ResendConfirmMailResult;


/***/ }),

/***/ "./src/server/signup/dto/resend-confirm-mail.dto.ts":
/*!**********************************************************!*\
  !*** ./src/server/signup/dto/resend-confirm-mail.dto.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let ResendConfirmMail = class ResendConfirmMail {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ResendConfirmMail.prototype, "email", void 0);
ResendConfirmMail = tslib_1.__decorate([
    type_graphql_1.InputType()
], ResendConfirmMail);
exports.ResendConfirmMail = ResendConfirmMail;


/***/ }),

/***/ "./src/server/signup/dto/reset-password-result.dto.ts":
/*!************************************************************!*\
  !*** ./src/server/signup/dto/reset-password-result.dto.ts ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let ResetPasswordResult = class ResetPasswordResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ResetPasswordResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ResetPasswordResult.prototype, "message", void 0);
ResetPasswordResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], ResetPasswordResult);
exports.ResetPasswordResult = ResetPasswordResult;


/***/ }),

/***/ "./src/server/signup/dto/reset-password.dto.ts":
/*!*****************************************************!*\
  !*** ./src/server/signup/dto/reset-password.dto.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let ResetPassword = class ResetPassword {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ResetPassword.prototype, "token", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ResetPassword.prototype, "password", void 0);
ResetPassword = tslib_1.__decorate([
    type_graphql_1.InputType()
], ResetPassword);
exports.ResetPassword = ResetPassword;


/***/ }),

/***/ "./src/server/signup/dto/send-reset-password-mail-result.dto.ts":
/*!**********************************************************************!*\
  !*** ./src/server/signup/dto/send-reset-password-mail-result.dto.ts ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let SendResetPasswordMailResult = class SendResetPasswordMailResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], SendResetPasswordMailResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SendResetPasswordMailResult.prototype, "message", void 0);
SendResetPasswordMailResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], SendResetPasswordMailResult);
exports.SendResetPasswordMailResult = SendResetPasswordMailResult;


/***/ }),

/***/ "./src/server/signup/dto/send-reset-password-mail.dto.ts":
/*!***************************************************************!*\
  !*** ./src/server/signup/dto/send-reset-password-mail.dto.ts ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let SendResetPasswordMail = class SendResetPasswordMail {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SendResetPasswordMail.prototype, "email", void 0);
SendResetPasswordMail = tslib_1.__decorate([
    type_graphql_1.InputType()
], SendResetPasswordMail);
exports.SendResetPasswordMail = SendResetPasswordMail;


/***/ }),

/***/ "./src/server/signup/dto/signup-result.dto.ts":
/*!****************************************************!*\
  !*** ./src/server/signup/dto/signup-result.dto.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let SignupResult = class SignupResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], SignupResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SignupResult.prototype, "message", void 0);
SignupResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], SignupResult);
exports.SignupResult = SignupResult;


/***/ }),

/***/ "./src/server/signup/dto/signup.dto.ts":
/*!*********************************************!*\
  !*** ./src/server/signup/dto/signup.dto.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let Signup = class Signup {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "kana", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "email", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "postcode", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "address", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "phone", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Signup.prototype, "password", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], Signup.prototype, "sex", void 0);
Signup = tslib_1.__decorate([
    type_graphql_1.InputType()
], Signup);
exports.Signup = Signup;


/***/ }),

/***/ "./src/server/signup/signup.module.ts":
/*!********************************************!*\
  !*** ./src/server/signup/signup.module.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const email_module_1 = __webpack_require__(/*! ../email/email.module */ "./src/server/email/email.module.ts");
const user_module_1 = __webpack_require__(/*! ../user/user.module */ "./src/server/user/user.module.ts");
const signup_service_1 = __webpack_require__(/*! ./signup.service */ "./src/server/signup/signup.service.ts");
const signup_resolver_1 = __webpack_require__(/*! ./signup.resolver */ "./src/server/signup/signup.resolver.ts");
let SignupModule = class SignupModule {
};
SignupModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            user_module_1.UserModule,
            email_module_1.EmailModule
        ],
        providers: [
            signup_service_1.SignupService,
            signup_resolver_1.SignupResolver
        ],
        controllers: [],
        exports: []
    })
], SignupModule);
exports.SignupModule = SignupModule;


/***/ }),

/***/ "./src/server/signup/signup.resolver.ts":
/*!**********************************************!*\
  !*** ./src/server/signup/signup.resolver.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const signup_service_1 = __webpack_require__(/*! ./signup.service */ "./src/server/signup/signup.service.ts");
const signup_dto_1 = __webpack_require__(/*! ./dto/signup.dto */ "./src/server/signup/dto/signup.dto.ts");
const signup_result_dto_1 = __webpack_require__(/*! ./dto/signup-result.dto */ "./src/server/signup/dto/signup-result.dto.ts");
const confirm_user_result_dto_1 = __webpack_require__(/*! ./dto/confirm-user-result.dto */ "./src/server/signup/dto/confirm-user-result.dto.ts");
const resend_confirm_mail_result_dto_1 = __webpack_require__(/*! ./dto/resend-confirm-mail-result.dto */ "./src/server/signup/dto/resend-confirm-mail-result.dto.ts");
const reset_password_dto_1 = __webpack_require__(/*! ./dto/reset-password.dto */ "./src/server/signup/dto/reset-password.dto.ts");
const reset_password_result_dto_1 = __webpack_require__(/*! ./dto/reset-password-result.dto */ "./src/server/signup/dto/reset-password-result.dto.ts");
const send_reset_password_mail_result_dto_1 = __webpack_require__(/*! ./dto/send-reset-password-mail-result.dto */ "./src/server/signup/dto/send-reset-password-mail-result.dto.ts");
const send_reset_password_mail_dto_1 = __webpack_require__(/*! ./dto/send-reset-password-mail.dto */ "./src/server/signup/dto/send-reset-password-mail.dto.ts");
const resend_confirm_mail_dto_1 = __webpack_require__(/*! ./dto/resend-confirm-mail.dto */ "./src/server/signup/dto/resend-confirm-mail.dto.ts");
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


/***/ }),

/***/ "./src/server/signup/signup.service.ts":
/*!*********************************************!*\
  !*** ./src/server/signup/signup.service.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_service_1 = __webpack_require__(/*! ../user/user.service */ "./src/server/user/user.service.ts");
const email_service_1 = __webpack_require__(/*! ../email/email.service */ "./src/server/email/email.service.ts");
const utils_1 = __webpack_require__(/*! ../utils/utils */ "./src/server/utils/utils.ts");
let SignupService = class SignupService {
    constructor(userService, emailService) {
        this.userService = userService;
        this.emailService = emailService;
    }
    // サインアップする
    signup(signup, _url) {
        return new Promise((resolve, reject) => {
            // ユーザを登録する
            this.userService.add(signup)
                .then((signupResult) => {
                // 正常にユーザが追加できたら、登録完了メールを送る
                if (signupResult.result === 0) {
                    this.emailService.sendTokenMail('emailconfirm', 'verifytoken', signup.email, _url)
                        .then((result) => {
                        resolve(signupResult);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
                // ユーザ登録で何らかのエラーがあったらその結果を返す
                else {
                    resolve(signupResult);
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    // 登録完了メールを再送する
    resendConfirmMail(_resendConfirmMail, _url) {
        return new Promise((resolve, reject) => {
            // Eメールでユーザ情報を取得する
            this.userService.findByEmail(_resendConfirmMail.email)
                .then((user) => {
                if (!user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                // すでに登録済みならエラーにする
                else if (user.isemailconfirmed === 1) {
                    resolve({
                        result: false,
                        message: 'すでに登録が完了しています'
                    });
                }
                // いずれでもなければ登録完了用メールを送信する
                else {
                    this.emailService.sendTokenMail('emailconfirm', 'verifytoken', _resendConfirmMail.email, _url)
                        .then((result) => {
                        resolve({
                            result: true,
                            message: ''
                        });
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            });
        });
    }
    // パスワードリセットメールを再送する
    sendResetPasswordMail(_sendResetPasswordMail, _url) {
        return new Promise((resolve, reject) => {
            // Eメールでユーザ情報を取得する
            this.userService.findByEmail(_sendResetPasswordMail.email)
                .then((user) => {
                if (!user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                // 登録が未完了だったらエラーにする
                else if (user.isemailconfirmed === 0) {
                    resolve({
                        result: false,
                        message: 'ユーザの登録が完了していません。登録完了メールで登録を完了してください。'
                    });
                }
                else {
                    // パスワードリセットフラグを設定する
                    user.ispasswordreset = 1;
                    // ユーザを保存する
                    this.userService.save(user)
                        .then((saveUser) => {
                        // パスワードリセット用メールを送信する
                        this.emailService.sendTokenMail('resetpassword', 'resetpassword', _sendResetPasswordMail.email, _url)
                            .then((result) => {
                            resolve({
                                result: true,
                                message: ''
                            });
                        })
                            .catch((err) => {
                            reject(err);
                        });
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    // ユーザ登録を完了する
    confirmUser(_token) {
        return new Promise((resolve, reject) => {
            // トークンをチェックする
            utils_1.Utils.verifyToken(_token)
                .then((payload) => {
                if (!payload) {
                    resolve({
                        result: false,
                        message: 'トークンが正しくありません。有効期限を確認してください。'
                    });
                }
                else {
                    // Eメールアドレスのユーザが登録されているかを確認する
                    this.userService.findByEmail(payload.email)
                        .then((user) => {
                        if (!user) {
                            resolve({
                                result: false,
                                message: 'ユーザが登録されていません。'
                            });
                        }
                        else {
                            // すでに登録完了だったらエラーにする
                            if (user.isemailconfirmed === 1) {
                                resolve({
                                    result: false,
                                    message: user.email + 'はすでに登録完了済みです'
                                });
                            }
                            else {
                                // 登録完了フラグを設定する
                                user.isemailconfirmed = 1;
                                // ユーザ情報を保存する
                                this.userService.save(user)
                                    .then((saveUser) => {
                                    resolve({
                                        result: true,
                                        message: ''
                                    });
                                })
                                    .catch((err) => {
                                    reject(err);
                                });
                            }
                        }
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    // パスワードをリセットする
    resetPassword(resetPassword) {
        return new Promise((resolve, reject) => {
            // トークンをチェックする
            utils_1.Utils.verifyToken(resetPassword.token)
                .then((payload) => {
                if (!payload) {
                    resolve({
                        result: false,
                        message: 'トークンが正しくありません。有効期限を確認してください。'
                    });
                }
                else {
                    // パスワードをリセットする
                    this.userService.resetPassword(payload.email, resetPassword.password)
                        .then((resetPasswordResult) => {
                        resolve(resetPasswordResult);
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
SignupService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__metadata("design:paramtypes", [user_service_1.UserService,
        email_service_1.EmailService])
], SignupService);
exports.SignupService = SignupService;


/***/ }),

/***/ "./src/server/site-config/dto/site-config-result.dto.ts":
/*!**************************************************************!*\
  !*** ./src/server/site-config/dto/site-config-result.dto.ts ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let SiteConfigResult = class SiteConfigResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], SiteConfigResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SiteConfigResult.prototype, "message", void 0);
SiteConfigResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], SiteConfigResult);
exports.SiteConfigResult = SiteConfigResult;


/***/ }),

/***/ "./src/server/site-config/dto/site-config.dto.ts":
/*!*******************************************************!*\
  !*** ./src/server/site-config/dto/site-config.dto.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let SiteConfig = class SiteConfig {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], SiteConfig.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SiteConfig.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SiteConfig.prototype, "email", void 0);
SiteConfig = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], SiteConfig);
exports.SiteConfig = SiteConfig;


/***/ }),

/***/ "./src/server/site-config/site-config.module.ts":
/*!******************************************************!*\
  !*** ./src/server/site-config/site-config.module.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const site_config_service_1 = __webpack_require__(/*! ./site-config.service */ "./src/server/site-config/site-config.service.ts");
const site_config_1 = __webpack_require__(/*! ./site-config */ "./src/server/site-config/site-config.ts");
const site_config_resolver_1 = __webpack_require__(/*! ./site-config.resolver */ "./src/server/site-config/site-config.resolver.ts");
let SiteConfigModule = class SiteConfigModule {
};
SiteConfigModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([site_config_1.SiteConfig])
        ],
        providers: [
            site_config_service_1.SiteConfigService,
            site_config_resolver_1.SiteConfigResolver
        ],
        exports: [
            site_config_service_1.SiteConfigService
        ]
    })
], SiteConfigModule);
exports.SiteConfigModule = SiteConfigModule;


/***/ }),

/***/ "./src/server/site-config/site-config.resolver.ts":
/*!********************************************************!*\
  !*** ./src/server/site-config/site-config.resolver.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const site_config_service_1 = __webpack_require__(/*! ./site-config.service */ "./src/server/site-config/site-config.service.ts");
const site_config_dto_1 = __webpack_require__(/*! ./dto/site-config.dto */ "./src/server/site-config/dto/site-config.dto.ts");
const site_config_result_dto_1 = __webpack_require__(/*! ./dto/site-config-result.dto */ "./src/server/site-config/dto/site-config-result.dto.ts");
let SiteConfigResolver = class SiteConfigResolver {
    constructor(siteConfigService) {
        this.siteConfigService = siteConfigService;
    }
    get() {
        return new Promise((resolve, reject) => {
            this.siteConfigService.get()
                .then((siteConfig) => {
                resolve(siteConfig);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    save(_siteConfig) {
        return new Promise((resolve, reject) => {
            this.siteConfigService.save(_siteConfig)
                .then((_siteConfigResult) => {
                resolve({
                    result: true,
                    message: ''
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
tslib_1.__decorate([
    graphql_1.Query(returns => site_config_dto_1.SiteConfig),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], SiteConfigResolver.prototype, "get", null);
tslib_1.__decorate([
    graphql_1.Mutation(returns => site_config_result_dto_1.SiteConfigResult),
    tslib_1.__param(0, graphql_1.Args('siteconfig')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [site_config_dto_1.SiteConfig]),
    tslib_1.__metadata("design:returntype", Promise)
], SiteConfigResolver.prototype, "save", null);
SiteConfigResolver = tslib_1.__decorate([
    graphql_1.Resolver(of => site_config_dto_1.SiteConfig),
    tslib_1.__metadata("design:paramtypes", [site_config_service_1.SiteConfigService])
], SiteConfigResolver);
exports.SiteConfigResolver = SiteConfigResolver;


/***/ }),

/***/ "./src/server/site-config/site-config.service.ts":
/*!*******************************************************!*\
  !*** ./src/server/site-config/site-config.service.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const site_config_1 = __webpack_require__(/*! ./site-config */ "./src/server/site-config/site-config.ts");
let SiteConfigService = class SiteConfigService {
    constructor(siteConfigRepogitory) {
        this.siteConfigRepogitory = siteConfigRepogitory;
    }
    get() {
        return new Promise((resolve, reject) => {
            this.siteConfigRepogitory.findOne(1)
                .then((siteConfig) => {
                resolve(siteConfig);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    save(_siteConfig) {
        return new Promise((resolve, reject) => {
            // idは必ず1固定とする
            _siteConfig.id = 1;
            this.siteConfigRepogitory.save(_siteConfig)
                .then((_saveSiteConfig) => {
                resolve({
                    result: true,
                    message: ''
                });
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
};
SiteConfigService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(site_config_1.SiteConfig)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], SiteConfigService);
exports.SiteConfigService = SiteConfigService;


/***/ }),

/***/ "./src/server/site-config/site-config.ts":
/*!***********************************************!*\
  !*** ./src/server/site-config/site-config.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let SiteConfig = class SiteConfig {
};
tslib_1.__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    tslib_1.__metadata("design:type", Number)
], SiteConfig.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SiteConfig.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column(),
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], SiteConfig.prototype, "email", void 0);
SiteConfig = tslib_1.__decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity({ name: 'siteconfig' })
], SiteConfig);
exports.SiteConfig = SiteConfig;


/***/ }),

/***/ "./src/server/user/dto/change-email-result.dto.ts":
/*!********************************************************!*\
  !*** ./src/server/user/dto/change-email-result.dto.ts ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let ChangeEmailResult = class ChangeEmailResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ChangeEmailResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeEmailResult.prototype, "message", void 0);
ChangeEmailResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], ChangeEmailResult);
exports.ChangeEmailResult = ChangeEmailResult;


/***/ }),

/***/ "./src/server/user/dto/change-email.dto.ts":
/*!*************************************************!*\
  !*** ./src/server/user/dto/change-email.dto.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let ChangeEmail = class ChangeEmail {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeEmail.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeEmail.prototype, "email", void 0);
ChangeEmail = tslib_1.__decorate([
    type_graphql_1.InputType()
], ChangeEmail);
exports.ChangeEmail = ChangeEmail;


/***/ }),

/***/ "./src/server/user/dto/change-password-result.dto.ts":
/*!***********************************************************!*\
  !*** ./src/server/user/dto/change-password-result.dto.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let ChangePasswordResult = class ChangePasswordResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ChangePasswordResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangePasswordResult.prototype, "message", void 0);
ChangePasswordResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], ChangePasswordResult);
exports.ChangePasswordResult = ChangePasswordResult;


/***/ }),

/***/ "./src/server/user/dto/change-password.dto.ts":
/*!****************************************************!*\
  !*** ./src/server/user/dto/change-password.dto.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let ChangePassword = class ChangePassword {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangePassword.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangePassword.prototype, "password", void 0);
ChangePassword = tslib_1.__decorate([
    type_graphql_1.InputType()
], ChangePassword);
exports.ChangePassword = ChangePassword;


/***/ }),

/***/ "./src/server/user/dto/change-profile-result.dto.ts":
/*!**********************************************************!*\
  !*** ./src/server/user/dto/change-profile-result.dto.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let ChangeProfileResult = class ChangeProfileResult {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Boolean)
], ChangeProfileResult.prototype, "result", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfileResult.prototype, "message", void 0);
ChangeProfileResult = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], ChangeProfileResult);
exports.ChangeProfileResult = ChangeProfileResult;


/***/ }),

/***/ "./src/server/user/dto/change-profile.dto.ts":
/*!***************************************************!*\
  !*** ./src/server/user/dto/change-profile.dto.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
let ChangeProfile = class ChangeProfile {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfile.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfile.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfile.prototype, "kana", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfile.prototype, "postcode", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfile.prototype, "address", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], ChangeProfile.prototype, "phone", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], ChangeProfile.prototype, "role", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], ChangeProfile.prototype, "ismailfrom", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], ChangeProfile.prototype, "sex", void 0);
ChangeProfile = tslib_1.__decorate([
    type_graphql_1.InputType()
], ChangeProfile);
exports.ChangeProfile = ChangeProfile;


/***/ }),

/***/ "./src/server/user/user.module.ts":
/*!****************************************!*\
  !*** ./src/server/user/user.module.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./src/server/user/user.service.ts");
const user_1 = __webpack_require__(/*! ./user */ "./src/server/user/user.ts");
const user_resolver_1 = __webpack_require__(/*! ./user.resolver */ "./src/server/user/user.resolver.ts");
const email_module_1 = __webpack_require__(/*! ../email/email.module */ "./src/server/email/email.module.ts");
const site_config_module_1 = __webpack_require__(/*! ../site-config/site-config.module */ "./src/server/site-config/site-config.module.ts");
let UserModule = class UserModule {
};
UserModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_1.User]),
            email_module_1.EmailModule,
            site_config_module_1.SiteConfigModule
        ],
        providers: [
            user_service_1.UserService,
            user_resolver_1.UserResolver
        ],
        controllers: [],
        exports: [
            user_service_1.UserService
        ]
    })
], UserModule);
exports.UserModule = UserModule;


/***/ }),

/***/ "./src/server/user/user.resolver.ts":
/*!******************************************!*\
  !*** ./src/server/user/user.resolver.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const graphql_1 = __webpack_require__(/*! @nestjs/graphql */ "@nestjs/graphql");
const user_1 = __webpack_require__(/*! ./user */ "./src/server/user/user.ts");
const user_service_1 = __webpack_require__(/*! ./user.service */ "./src/server/user/user.service.ts");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const gqlauthguard_1 = __webpack_require__(/*! ../guards/gqlauthguard */ "./src/server/guards/gqlauthguard.ts");
const change_email_dto_1 = __webpack_require__(/*! ./dto/change-email.dto */ "./src/server/user/dto/change-email.dto.ts");
const change_email_result_dto_1 = __webpack_require__(/*! ./dto/change-email-result.dto */ "./src/server/user/dto/change-email-result.dto.ts");
const change_password_dto_1 = __webpack_require__(/*! ./dto/change-password.dto */ "./src/server/user/dto/change-password.dto.ts");
const change_password_result_dto_1 = __webpack_require__(/*! ./dto/change-password-result.dto */ "./src/server/user/dto/change-password-result.dto.ts");
const change_profile_dto_1 = __webpack_require__(/*! ./dto/change-profile.dto */ "./src/server/user/dto/change-profile.dto.ts");
const change_profile_result_dto_1 = __webpack_require__(/*! ./dto/change-profile-result.dto */ "./src/server/user/dto/change-profile-result.dto.ts");
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


/***/ }),

/***/ "./src/server/user/user.service.ts":
/*!*****************************************!*\
  !*** ./src/server/user/user.service.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ "@nestjs/typeorm");
const typeorm_2 = __webpack_require__(/*! typeorm */ "typeorm");
const bcrypt = __webpack_require__(/*! bcrypt */ "bcrypt");
const user_1 = __webpack_require__(/*! ./user */ "./src/server/user/user.ts");
const email_service_1 = __webpack_require__(/*! ../email/email.service */ "./src/server/email/email.service.ts");
let UserService = class UserService {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    // 指定されたEメールアドレスのユーザを検索する
    findByEmail(_email) {
        return new Promise((resolve, reject) => {
            this.userRepository.findOne({ where: { email: _email } })
                .then((user) => {
                resolve(user);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    /**
     * IDでユーザ情報を取得する
     * @param _id: string ID
     * @return User: User ユーザ情報
     */
    findById(_id) {
        return new Promise((resolve, reject) => {
            this.userRepository.findOne(_id)
                .then((user) => {
                resolve(user);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    // ユーザを追加する
    add(signup) {
        return new Promise((resolve, reject) => {
            this.findByEmail(signup.email)
                .then((user) => {
                if (user !== undefined) {
                    if (user.isemailconfirmed) {
                        resolve({
                            result: 1,
                            message: 'すでに登録されています。サインインしてください。'
                        });
                    }
                    else {
                        resolve({
                            result: 2,
                            message: '登録が完了していません。登録完了メールで登録を完了してください。'
                        });
                    }
                }
                else {
                    // ユーザ情報を設定する
                    const addUser = new user_1.User();
                    addUser.name = signup.name;
                    addUser.kana = signup.kana;
                    addUser.email = signup.email;
                    addUser.postcode = signup.postcode;
                    addUser.address = signup.address;
                    addUser.phone = signup.phone;
                    // パスワードはハッシュ化する
                    addUser.password = this.getPasswordHash(signup.password);
                    // Eメール確認フラグは1に設定する
                    addUser.isemailconfirmed = 1;
                    // ユーザ情報を登録する
                    this.userRepository.save(addUser)
                        .then((result) => {
                        resolve({
                            result: 0,
                            message: ''
                        });
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    // ユーザ情報を更新する
    save(_user) {
        return new Promise((resolve, reject) => {
            this.userRepository.save(_user)
                .then((user) => {
                resolve(user);
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    resetPassword(_email, _password) {
        return new Promise((resolve, reject) => {
            // ユーザ情報を取得する
            this.findByEmail(_email)
                .then((user) => {
                // ユーザ情報が取得できなければエラーにする
                if (!user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                // パスワードリセットフラグが0ならエラーにする
                else if (user.ispasswordreset === 0) {
                    resolve({
                        result: false,
                        message: 'パスワードがリセットされていません'
                    });
                }
                // 指定されたパスワードを設定する
                else {
                    user.password = this.getPasswordHash(_password);
                    user.ispasswordreset = 0;
                    this.userRepository.save(user)
                        .then((resetUser) => {
                        resolve({
                            result: true,
                            message: ''
                        });
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            });
        });
    }
    /**
     * Eメールアドレスを変更する
     * @params _changeEmail: IChangeEmail Eメールアドレス変更情報
     * @returns changeEmailResult: IChangeEmailResult Eメールアドレス変更結果
     */
    changeEmail(_changeEmail, _url) {
        return new Promise((resolve, reject) => {
            // IDに該当するユーザ情報を取得する
            this.findById(_changeEmail.id)
                .then((user) => {
                if (!user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                else {
                    // Eメールアドレスを変更する
                    user.email = _changeEmail.email;
                    // 登録完了フラグを1にする
                    user.isemailconfirmed = 1;
                    this.save(user)
                        .then((_saveUser) => {
                        this.emailService.sendTokenMail('changeemailconfirm', 'verifytoken', _saveUser.email, _url)
                            .then((result) => {
                            if (result === true) {
                                resolve({
                                    result: true,
                                    message: ''
                                });
                            }
                            else {
                                resolve({
                                    result: false,
                                    message: 'Eメールアドレス変更完了のメール送信ができません'
                                });
                            }
                        })
                            .catch((err) => {
                            reject(err);
                        });
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    /**
     * IDに該当するユーザのパスワードを変更する
     * @param _changePassword パスワード変更情報
     * @returns パスワード変更結果
     */
    changePassword(_changePassword) {
        return new Promise((resolve, reject) => {
            // ID指定でユーザ情報を取得する
            this.findById(_changePassword.id)
                .then((_user) => {
                if (!_user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                else {
                    // パスワードを設定する
                    _user.password = this.getPasswordHash(_changePassword.password);
                    // ユーザ情報を保存する
                    this.save(_user)
                        .then((_saveUser) => {
                        resolve({
                            result: true,
                            message: ''
                        });
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    /**
     * IDに合致するユーザのプロファイルを変更する
     * @param _changeProfile プロファイル情報
     * @returns プロファイル変更結果
     */
    changeProfile(_changeProfile) {
        return new Promise((resolve, reject) => {
            // IDに該当するユーザ情報を取得する
            this.findById(_changeProfile.id)
                .then((_user) => {
                if (!_user) {
                    resolve({
                        result: false,
                        message: 'ユーザが登録されていません'
                    });
                }
                else {
                    // ユーザ情報を設定する
                    _user.name = _changeProfile.name;
                    _user.kana = _changeProfile.kana;
                    _user.postcode = _changeProfile.postcode;
                    _user.address = _changeProfile.address;
                    _user.phone = _changeProfile.phone;
                    _user.role = _changeProfile.role;
                    _user.sex = _changeProfile.sex;
                    // ユーザ情報を保存する
                    this.save(_user)
                        .then((_saveUser) => {
                        resolve({
                            result: true,
                            message: ''
                        });
                    })
                        .catch((err) => {
                        reject(err);
                    });
                }
            });
        });
    }
    // パスワードをハッシュ化する
    getPasswordHash(_password) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(_password, salt);
    }
};
UserService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(user_1.User)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./src/server/user/user.ts":
/*!*********************************!*\
  !*** ./src/server/user/user.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = __webpack_require__(/*! tslib */ "tslib");
__webpack_require__(/*! reflect-metadata */ "reflect-metadata");
const typeorm_1 = __webpack_require__(/*! typeorm */ "typeorm");
const type_graphql_1 = __webpack_require__(/*! type-graphql */ "type-graphql");
/**
 * ユーザテーブル
 */
let User = class User {
};
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "kana", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "postcode", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "address", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "phone", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "isemailconfirmed", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "ispasswordreset", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "sex", void 0);
User = tslib_1.__decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity({ name: 'user' })
], User);
exports.User = User;


/***/ }),

/***/ "./src/server/utils/utils.ts":
/*!***********************************!*\
  !*** ./src/server/utils/utils.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
class Utils {
    /**
     * contextからサーバー名を取得する
     * @param _context: any context
     * @returns サーバー名
     */
    static getServerName(_url) {
        const urlinfo = new URL(_url);
        let serverName = urlinfo.protocol + '//' + urlinfo.hostname;
        if (urlinfo.port) {
            serverName += ':' + urlinfo.port;
        }
        return serverName;
    }
    /**
     * Eメールアドレスからトークンを作成する
     * @param _email: string Eメールアドレス
     * @returns トークン
     */
    static getTokenByEmail(_email) {
        // JWTを作成する
        const jwtPayload = { email: _email };
        const token = jwt.sign(jwtPayload, Buffer.from(process.env.RSA_PRIVATE_KEY, 'base64'), {
            algorithm: 'RS256',
            expiresIn: '7d',
            subject: _email
        });
        return token;
    }
    /**
     * トークンを公開鍵で検証する
     * @param _token トークン
     * @returns payload(undefinedはトークンの有効期間切れ)
     */
    static verifyToken(_token) {
        return new Promise((resolve, reject) => {
            // JWTを公開鍵で検証する
            jwt.verify(_token, Buffer.from(process.env.RSA_PUBLIC_KEY, 'base64'), {
                algorithms: ['RS256']
            }, ((err, payload) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        resolve(undefined);
                    }
                    else {
                        reject(err);
                    }
                }
                else {
                    resolve(payload);
                }
            }));
        });
    }
}
exports.Utils = Utils;


/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/graphql":
/*!**********************************!*\
  !*** external "@nestjs/graphql" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/graphql");

/***/ }),

/***/ "@nestjs/jwt":
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/jwt");

/***/ }),

/***/ "@nestjs/passport":
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/passport");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "@sendgrid/mail":
/*!*********************************!*\
  !*** external "@sendgrid/mail" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@sendgrid/mail");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bcrypt");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "passport-jwt":
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),

/***/ "reflect-metadata":
/*!***********************************!*\
  !*** external "reflect-metadata" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("reflect-metadata");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ }),

/***/ "type-graphql":
/*!*******************************!*\
  !*** external "type-graphql" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("type-graphql");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("typeorm");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map