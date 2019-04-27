import { IAuthResult } from '../../auth/interfaces/iauth-result.interface';

export interface ISigninResult extends IAuthResult {
    result: boolean;
    message: string;
    token: string;
}
