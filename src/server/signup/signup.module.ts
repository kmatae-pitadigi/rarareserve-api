import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { UserModule } from '../user/user.module';
import { SignupService } from './signup.service';
import { SignupResolver } from './signup.resolver';

@Module({
    imports: [
        UserModule,
        EmailModule
    ],
    providers: [
        SignupService,
        SignupResolver
    ],
    controllers: [],
    exports: [
        SignupService
    ]
})
export class SignupModule {}
