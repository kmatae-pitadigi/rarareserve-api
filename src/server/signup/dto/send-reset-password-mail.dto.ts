import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';
import { ISendResetPasswordMail } from '../interfaces/isend-reset-password-mail.interface';

@InputType()
export class SendResetPasswordMail implements ISendResetPasswordMail {
    @Field()
    email: string;
}
