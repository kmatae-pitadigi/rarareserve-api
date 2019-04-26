import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteConfig } from './site-config';
import { ISiteConfig } from './interfaces/isite-config.interface';
import { ISiteConfigResult } from './interfaces/isite-config-result.interface';

@Injectable()
export class SiteConfigService {
    constructor(
        @InjectRepository(SiteConfig)
        private readonly siteConfigRepogitory: Repository<SiteConfig>
    ) {}

    get(): Promise<ISiteConfig> {
        return new Promise((resolve, reject) => {
            this.siteConfigRepogitory.findOne(1)
            .then((siteConfig: ISiteConfig) => {
                resolve(siteConfig);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    save(_siteConfig: ISiteConfig): Promise<ISiteConfigResult> {
        return new Promise((resolve, reject) => {
            // idは必ず1固定とする
            _siteConfig.id = 1;
            this.siteConfigRepogitory.save(_siteConfig)
            .then((_saveSiteConfig: ISiteConfig) => {
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
}
