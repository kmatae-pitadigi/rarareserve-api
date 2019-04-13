"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const user_1 = require("./user/user");
const site_config_1 = require("./site-config/site-config");
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
//# sourceMappingURL=init.data.setup.js.map