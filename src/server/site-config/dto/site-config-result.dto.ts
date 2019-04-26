import 'reflect-metadata';
import { ObjectType, Field,  } from 'type-graphql';
import { ISiteConfigResult } from '../interfaces/isite-config-result.interface';

@ObjectType()
export class SiteConfigResult implements ISiteConfigResult {
    @Field()
    result: boolean;
    @Field()
    message: string;
}
