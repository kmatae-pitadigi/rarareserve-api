import 'reflect-metadata';
import { ObjectType, Field } from 'type-graphql';
import { ISignupResult } from '../interfaces/isignup-result.interface';

@ObjectType()
export class SignupResult implements ISignupResult {
    @Field()
    result: number;
    @Field()
    message: string;
}