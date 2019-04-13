import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import { IConfirmUserResult } from '../interfaces/iconfirm-user-result.interface';

@ObjectType()
export class ConfirmUserResult implements IConfirmUserResult {
    @Field()
    result: boolean;
    @Field()
    message: string;
}