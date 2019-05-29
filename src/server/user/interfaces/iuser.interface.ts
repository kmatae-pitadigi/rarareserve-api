export interface IUser {
    id?: string;
    name: string;
    kana: string;
    email: string;
    postcode?: string;
    address?: string;
    phone?: string;
    password?: string;
    role: number;
    isemailconfirmed?: boolean;
    ispasswordreset?: boolean;
    sex: number;
    createdAt?: Date;
    updatedAt?: Date;
    birthday?: Date;
}
