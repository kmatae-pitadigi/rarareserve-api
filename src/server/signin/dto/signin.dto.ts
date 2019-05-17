import 'reflect-metadata';
import { Field, InputType } from 'type-graphql';
import { ISignin } from '../interfaces/isignin.interface';

@InputType()
export class Signin implements ISignin {
    @Field()
    email: string;
    @Field()
    password: string;
}
