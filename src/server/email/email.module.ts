import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { SiteConfigModule } from '../site-config/site-config.module';

@Module({
    imports: [
        SiteConfigModule
    ],
    providers: [
        EmailService
    ],
    controllers: [  ],
    exports: [
        EmailService
    ]

})
export class EmailModule {}
