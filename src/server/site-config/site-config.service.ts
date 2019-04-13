import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteConfig } from './site-config';

@Injectable()
export class SiteConfigService {
    constructor(
        @InjectRepository(SiteConfig)
        private readonly siteConfigRepogitory: Repository<SiteConfig>
    ) {}

    getSiteConfig(): Promise<SiteConfig> {
        return new Promise((resolve, reject) => {
            this.siteConfigRepogitory.findOne(1)
            .then((siteConfig: SiteConfig) => {
                resolve(siteConfig);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
