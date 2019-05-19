import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user';
import { SigninModule } from './signin/signin.module';
import { EmailModule } from './email/email.module';
import { SignupModule } from './signup/signup.module';
import { AuthModule } from './auth/auth.module';
import { SiteConfigModule } from './site-config/site-config.module';
import { SiteConfig } from './site-config/site-config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/rolesguard';
import { UploadFileModule } from './upload-file/upload-file.module';
import { PartnerModule } from './partner/partner.module';
import { Partner } from './partner/partner';

@Module({
  imports: [
    SigninModule,
    SignupModule,
    AuthModule,
    SiteConfigModule,
    PartnerModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      playground: (process.env.NODE_ENV || 'development') === 'development',
      debug: (process.env.NODE_ENV || 'development') === 'development',
      tracing: (process.env.NODE_ENV || 'development') === 'development'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: parseInt(process.env.DATABASE_PORT, 10),
      database: process.env.DATABASE_DATABASE,
      logging: process.env.NODE_ENV === 'development',
      migrationsRun: true,
      migrations: [ __dirname + '/../db/migrations/**/*.js'],
      entities: [
        User,
        SiteConfig,
        Partner
      ]
    }),
    UserModule,
    EmailModule,
    UploadFileModule
  ],

  providers: [
    { provide: APP_GUARD, useClass: RolesGuard }
  ],

  controllers: []
})
export class AppModule {}
