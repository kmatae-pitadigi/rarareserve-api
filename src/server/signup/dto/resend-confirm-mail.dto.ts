import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';
import { IResendConfirmMail } from '../interfaces/iresend-confirm-mail.interface';

@InputType()
export class ResendConfirmMail implements IResendConfirmMail {
    @Field()
    email: string;
}
