import 'reflect-metadata';
import { ObjectType, Field,  } from 'type-graphql';
import { ISaveSiteConfigResult } from '../interfaces/isave-site-config-result.interface';

@ObjectType()
export class SaveSiteConfigResult implements ISaveSiteConfigResult {
    @Field()
    result: boolean;
    @Field()
    message: string;
}
