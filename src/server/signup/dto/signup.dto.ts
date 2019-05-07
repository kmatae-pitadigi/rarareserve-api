import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';
import { ISignup } from '../interfaces/isignup.interface';

@InputType()
export class Signup implements ISignup {
    @Field()
    name: string;
    @Field()
    kana: string;
    @Field()
    email: string;
    @Field()
    postcode: string;
    @Field()
    address: string;
    @Field()
    phone: string;
    @Field()
    password: string;
    @Field()
    sex: number;
}