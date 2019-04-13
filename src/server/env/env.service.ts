import { Injectable } from '@nestjs/common';
import { IEnvResult } from './interfaces/ienv-result.interface';
import { SiteConfigService } from '../site-config/site-config.service';
import { ISiteConfig } from '../site-config/interfaces/isite-config.interface';

@Injectable()
export class EnvService {
    constructor(
        private readonly siteConfigService: SiteConfigService
    ) {}

    getEnv(): Promise<IEnvResult> {
        return new Promise((resolve, reject) => {
            this.siteConfigService.getSiteConfig()
            .then((_siteConfig: ISiteConfig) => {
                resolve({
                    serviceName: _siteConfig.name
                });
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
