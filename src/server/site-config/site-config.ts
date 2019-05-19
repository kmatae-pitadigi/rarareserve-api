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
    sitename: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field({ nullable: true })
    headerimagefilename?: string;

    @Column()
    @Field({ nullable: true })
    headerimage?: string;

    @Column()
    @Field({ nullable: true })
    toppage?: string;

    @Column()
    @Field({ nullable: true })
    footerpage?: string;

    @Column()
    @Field({ nullable: true })
    footerimagefilename?: string;

    @Column()
    @Field({ nullable: true })
    footerimage?: string;

    @Column()
    @Field()
    changeemailconfirm: string;

    @Column()
    @Field()
    emailconfirm: string;

    @Column()
    @Field()
    resetpassword: string;

    @Column()
    @Field()
    createdAt: Date;

    @Column()
    @Field()
    updatedAt: Date;
}
