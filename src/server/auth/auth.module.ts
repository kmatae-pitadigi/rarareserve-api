import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: Buffer.from(process.env.RSA_PRIVATE_KEY, 'base64'),
      signOptions: {
        algorithm: 'RSA256',
        expiresIn: '24h'
      }
    }),
    UserModule
  ],

  providers: [
    AuthService,
    JwtStrategy
  ],

  exports: [
    AuthService
  ]
})
export class AuthModule {}
