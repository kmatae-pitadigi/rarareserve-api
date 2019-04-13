import { Module } from '@nestjs/common';
import { EnvService } from './env.service';
import { EnvResolver } from './env.resolver';
import { SiteConfigModule } from '../site-config/site-config.module';

@Module({
    imports: [
        SiteConfigModule
    ],
    providers: [
        EnvService,
        EnvResolver
    ]
})
export class EnvModule {}
