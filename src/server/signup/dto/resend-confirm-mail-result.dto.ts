import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import { IResendConfirmMailResult } from '../interfaces/iresend-confirm-mail-result.interface';

@ObjectType()
export class ResendConfirmMailResult implements IResendConfirmMailResult {
    @Field()
    result: boolean;
    @Field()
    message: string;
}