import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';
import { IChangeEmail } from '../interfaces/ichange-email.interface';

@InputType()
export class ChangeEmail implements IChangeEmail {
    @Field()
    id: string;
    @Field()
    email: string;
}
