import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import { IResetPasswordResult } from '../interfaces/ireset-password-result.interface';

@ObjectType()
export class ResetPasswordResult implements IResetPasswordResult {
    @Field()
    result: boolean;
    @Field()
    message: string;
}