import 'reflect-metadata';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { ISiteConfig } from './interfaces/isite-config.interface';

@ObjectType()
@Entity({name: 'siteconfig'})
export class SiteConfig implements ISiteConfig {

    @Column()
    @Field()
    @PrimaryColumn()
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    email: string;
}
