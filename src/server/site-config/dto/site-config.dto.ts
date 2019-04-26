import 'reflect-metadata';
import { ObjectType, Field,  } from 'type-graphql';
import { ISiteConfig } from '../interfaces/isite-config.interface';

@ObjectType()
export class SiteConfig implements ISiteConfig {
    @Field()
    id: number;
    @Field()
    name: string;
    @Field()
    email: string;
}
