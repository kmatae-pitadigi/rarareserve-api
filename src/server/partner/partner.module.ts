import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './partner';
import { PartnerService } from './partner.service';
import { PartnerResolver } from './partner.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner]),
    UserModule
  ],

  providers: [
    PartnerService,
    PartnerResolver
  ]
})
export class PartnerModule {}
