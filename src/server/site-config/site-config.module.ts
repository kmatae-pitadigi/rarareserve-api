import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteConfigService } from './site-config.service';
import { SiteConfig } from './site-config';

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteConfig])
  ],
  providers: [
    SiteConfigService
  ],
  exports: [
    SiteConfigService
  ]
})
export class SiteConfigModule {}
