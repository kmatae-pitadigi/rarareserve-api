import { IPartner } from '../../partner/interfaces/ipartner.interface';

export interface IUser {
    id: string;
    name: string;
    kana: string;
    email: string;
    postcode: string;
    address: string;
    phone: string;
    password: string;
    role: number;
    isemailconfirmed: number;
    ispasswordreset: number;
    sex: number;
    createdAt: Date;
    updatedAt: Date;
    partners?: IPartner[];
}
