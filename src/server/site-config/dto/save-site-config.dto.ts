import 'reflect-metadata';
import { InputType, Field,  } from 'type-graphql';
import { ISiteConfig } from '../interfaces/isite-config.interface';

@InputType()
export class SaveSiteConfig implements ISiteConfig {
    @Field()
    id: number;
    @Field()
    sitename: string;
    @Field()
    email: string;
}
