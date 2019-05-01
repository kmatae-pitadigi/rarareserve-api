import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import { IChangePasswordResult } from '../interfaces/ichange-password-result.interface';

@ObjectType()
export class ChangePasswordResult implements IChangePasswordResult {
    @Field()
    result: boolean;
    @Field()
    message: string;
}