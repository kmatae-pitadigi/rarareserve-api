import { IAddPartnerResult } from '../interfaces/iadd-partner-result.interface';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class AddPartnerResult implements IAddPartnerResult {
    @Field()
    result: boolean;

    @Field()
    message: string;
}
