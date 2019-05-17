import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import { IChangeProfileResult } from '../interfaces/ichange-profile-result.interface';

@ObjectType()
export class ChangeProfileResult implements IChangeProfileResult {
    @Field()
    result: boolean;
    @Field()
    message: string;
}
