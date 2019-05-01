import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteConfigService } from './site-config.service';
import { SiteConfig } from './site-config';
import { SiteConfigResolver } from './site-config.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteConfig])
  ],
  providers: [
    SiteConfigService,
    SiteConfigResolver
  ],
  exports: [
    SiteConfigService
  ]
})
export class SiteConfigModule {}
