import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SiteConfig } from './site-config';
import { ISiteConfig } from './interfaces/isite-config.interface';

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

    save(_siteConfig: ISiteConfig): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // idは必ず1固定とする
            _siteConfig.id = 1;
            this.siteConfigRepogitory.update({id: _siteConfig.id}, _siteConfig)
            .then((_saveSiteConfig: UpdateResult) => {
                resolve(true);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
