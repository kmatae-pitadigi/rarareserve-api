import { getRepository } from 'typeorm';
import { User } from './user/user';
import { SiteConfig } from './site-config/site-config';

export class InitDataSetup {
    async setup() {
        await this.Initialize1554538980430();
    }

    private async Initialize1554538980430() {
        // 管理者ユーザを追加する
        const userRepository = getRepository(User);

        const user: User = await userRepository.findOne({where: {email: 'admin@local'}});
        if (!user) {
            const addUser = new User();
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
        const siteConfigRepository = getRepository(SiteConfig);
        const siteconfig: SiteConfig = await siteConfigRepository.findOne(1);
        if (!siteconfig) {
            const addSiteConfig: SiteConfig = new SiteConfig();
            addSiteConfig.id = 1;
            addSiteConfig.sitename = 'スキッズキャンプ予約サイト';
            addSiteConfig.email = 'admin@local';

            siteConfigRepository.save(addSiteConfig);
        }

        console.info('InitDataSetup: Initialize1554538980430 done');
    }
}
