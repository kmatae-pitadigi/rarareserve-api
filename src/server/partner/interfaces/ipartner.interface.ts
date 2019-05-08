import { IUser } from '../../user/interfaces/iuser.interface';

export interface IPartner {
    id: string;
    user: IUser;
    name: string;
    kana: string;
    sex: number;
    createdAt: Date;
    updatedAt: Date;
}
