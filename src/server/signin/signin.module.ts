import { Module } from '@nestjs/common';

import { SigninService } from './signin.service';
import { SigninResolver } from './signin.resolver';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
      AuthModule
    ],
    providers: [
      SigninService,
      SigninResolver
    ],
    controllers: [],
    exports: []
})
export class SigninModule {
}
