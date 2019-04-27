import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import { IChangeEmailResult } from '../interfaces/ichange-email-result.interface';

@ObjectType()
export class ChangeEmailResult implements IChangeEmailResult {
    @Field()
    result: boolean;
    @Field()
    message: string;
}