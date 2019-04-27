import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SiteConfigService } from './site-config.service';
import { SiteConfig } from './site-config';
import { SaveSiteConfig } from './dto/save-site-config.dto';
import { SaveSiteConfigResult } from './dto/save-site-config-result.dto';
import { UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from '../guards/adminauthguard';
import { JwtAuthGuard } from '../guards/jwtauthguard';

@Resolver(of => SiteConfig)
export class SiteConfigResolver {
    constructor(
        private readonly siteConfigService: SiteConfigService
    ) {}

    @Query(returns => SiteConfig)
    getsiteconfig(@Args('id') _id: number): Promise<SiteConfig> {
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

    @Mutation(returns => SaveSiteConfigResult)
    @UseGuards(JwtAuthGuard, AdminAuthGuard)
    savesiteconfig(@Args('savesiteconfig') _saveSiteConfig: SaveSiteConfig): Promise<SaveSiteConfigResult> {
        return new Promise((resolve, reject) => {
            this.siteConfigService.save(_saveSiteConfig)
            .then((_siteConfig: SiteConfig) => {
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
