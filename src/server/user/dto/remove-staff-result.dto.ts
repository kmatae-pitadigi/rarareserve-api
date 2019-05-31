import { ObjectType, Field } from 'type-graphql';
import { IRemoveStaffResult } from '../interfaces/iremove-staff-result.interface';

@ObjectType()
export class RemoveStaffResult implements IRemoveStaffResult {
    @Field()
    result: boolean;
    @Field()
    message: string;
}