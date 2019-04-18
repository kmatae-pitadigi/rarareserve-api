import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user';
import { SigninModule } from './signin/signin.module';
import { EmailModule } from './email/email.module';
import { SignupModule } from './signup/signup.module';
import { EnvModule } from './env/env.module';
import { AuthModule } from './auth/auth.module';
import { SiteConfigModule } from './site-config/site-config.module';
import { SiteConfig } from './site-config/site-config';

@Module({
  imports: [
    EnvModule,
    SigninModule,
    SignupModule,
    AuthModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      playground: (process.env.NODE_ENV || 'development') === 'development',
      debug: (process.env.NODE_ENV || 'development') === 'development',
      tracing: (process.env.NODE_ENV || 'development') === 'development'
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      url: process.env.DATABASE_URL,
      extra: {
        options: {
          encrypt: process.env.DATABSE_ENCRYPT
        }
      },
      logging: process.env.NODE_ENV === 'development',
      migrationsRun: true,
      migrations: [ __dirname + '/../db/migrations/**/*.js'],
      entities: [
        User,
        SiteConfig
      ]
    }),
    UserModule,
    EmailModule,
    SiteConfigModule
  ],

  providers: [
  ],

  controllers: []
})
export class AppModule {}
