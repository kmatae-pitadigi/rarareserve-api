import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';
import { IChangePassword } from '../interfaces/ichange-password.interface';

@InputType()
export class ChangePassword implements IChangePassword {
    @Field()
    id: string;
    @Field()
    password: string;
}
