import 'reflect-metadata';
import { InputType, Field,  } from 'type-graphql';
import { ISaveSiteConfig } from '../interfaces/isave-site-config.interface';

@InputType()
export class SaveSiteConfig implements ISaveSiteConfig {
    @Field()
    id: number;
    @Field()
    sitename: string;
    @Field()
    email: string;
    @Field({ nullable: true })
    headerimagefilename?: string;
    @Field({ nullable: true })
    footerimagefilename?: string;
    @Field({ nullable: true })
    toppage?: string;
    @Field({ nullable: true })
    footerpage?: string;
    @Field()
    changeemailconfirm: string;
    @Field()
    emailconfirm: string;
    @Field()
    resetpassword: string;
}
