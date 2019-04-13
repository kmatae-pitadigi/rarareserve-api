import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';
import { IChangeProfile } from '../interfaces/ichange-profile.interface';

@InputType()
export class ChangeProfile implements IChangeProfile {
    @Field()
    id: string;
    @Field()
    name: string;
    @Field()
    kana: string;
    @Field()
    postcode: string;
    @Field()
    address: string;
    @Field()
    phone: string;
    @Field()
    role: number;
    @Field()
    ismailfrom: number;
    @Field()
    sex: number;
}