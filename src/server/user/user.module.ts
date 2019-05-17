import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user';
import { UserResolver } from './user.resolver';
import { EmailModule } from '../email/email.module';
import { SiteConfigModule } from '../site-config/site-config.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        EmailModule,
        SiteConfigModule
    ],
    providers: [
        UserService,
        UserResolver
    ],
    controllers: [  ],
    exports: [
        UserService
    ]
})
export class UserModule {}
