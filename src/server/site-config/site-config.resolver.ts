import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SiteConfigService } from './site-config.service';
import { SiteConfig } from './dto/site-config.dto';
import { SiteConfigResult } from './dto/site-config-result.dto';

@Resolver(of => SiteConfig)
export class SiteConfigResolver {
    constructor(
        private readonly siteConfigService: SiteConfigService
    ) {}

    @Query(returns => SiteConfig)
    get(): Promise<SiteConfig> {
        return new Promise((resolve, reject) => {
            this.siteConfigService.get()
            .then((siteConfig: SiteConfig) => {
                resolve(siteConfig);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @Mutation(returns => SiteConfigResult)
    save(@Args('siteconfig') _siteConfig: SiteConfig): Promise<SiteConfigResult> {
        return new Promise((resolve, reject) => {
            this.siteConfigService.save(_siteConfig)
            .then((_siteConfigResult: SiteConfigResult) => {
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
