import { ObjectType, Field } from 'type-graphql';
import { ISavePartnerResult } from '../interfaces/isave-partner-result.interface';

@ObjectType()
export class SavePartnerResult implements ISavePartnerResult {
    @Field()
    result: boolean;

    @Field()
    message: string;
}
