"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@nestjs/core");
const helmet = require("helmet");
const express = require("express");
const path = require("path");
const app_module_1 = require("./app.module");
const process = require("process");
const init_data_setup_1 = require("./init.data.setup");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.use(helmet());
        // graphql以外のルーティングはAngularで行う
        app.use(express.static(path.join(__dirname, '../client')));
        app.use(/^\/(?!graphql).*/, express.static(path.join(__dirname, '../client/index.html')));
        // 初期値を設定する
        const initDataSetup = new init_data_setup_1.InitDataSetup();
        initDataSetup.setup();
        yield app.listen(process.env.PORT || 3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map