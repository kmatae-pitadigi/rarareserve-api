import { ObjectType, Field } from 'type-graphql';
import { ISaveStaffResult } from '../interfaces/isave-staff-result.interface';

@ObjectType()
export class SaveStaffResult implements ISaveStaffResult {
    @Field()
    result: boolean;
    @Field()
    message: string;
}