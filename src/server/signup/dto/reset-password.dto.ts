import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';
import { IResetPassword } from '../interfaces/ireset-password.interface';

@InputType()
export class ResetPassword implements IResetPassword {
    @Field()
    token: string;
    @Field()
    password: string;
}