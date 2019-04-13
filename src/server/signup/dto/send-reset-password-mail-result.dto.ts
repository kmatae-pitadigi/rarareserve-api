import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import { ISendResetPasswordMailResult } from '../interfaces/isend-reset-password-mail-result.interface';

@ObjectType()
export class SendResetPasswordMailResult implements ISendResetPasswordMailResult {
    @Field()
    result: boolean;
    @Field()
    message: string;
}