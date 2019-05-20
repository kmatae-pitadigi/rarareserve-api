import { ObjectType, Field } from 'type-graphql';
import { IRemovePartnerResult } from '../interfaces/iremove-partner-result.interface';

@ObjectType()
export class RemovePartnerResult implements IRemovePartnerResult {
    @Field()
    result: boolean;

    @Field()
    message: string;
}
