import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './partner';

@Module({
  imports: [
    TypeOrmModule.forFeature([Partner])
  ],

  providers: [
  ]
})
export class PartnerModule {}
