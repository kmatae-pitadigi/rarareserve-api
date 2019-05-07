import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import { ISigninResult } from '../interfaces/isignin-result.interface';

@ObjectType()
export class SigninResult implements ISigninResult {
    @Field()
    result: boolean;
    @Field()
    message: string;
    @Field()
    token: string;
}
