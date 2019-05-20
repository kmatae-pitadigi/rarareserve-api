import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './partner';
import { UserService } from '../user/user.service';
import { IUser } from '../user/interfaces/iuser.interface';

@Injectable()
export class PartnerService {
    constructor(
        @InjectRepository(Partner)
        private readonly partnerRepository: Repository<Partner>,
        private readonly userService: UserService
    ) {}

    /**
     * パートナー情報を保存する(IDなければ追加、IDがなければ追加)
     * @param _partner パートナー情報
     * @returns 保存結果
     */
    save(_partner: Partner): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.partnerRepository.save(_partner)
            .then((_savePartner: Partner) => {
                resolve(true);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * ユーザのEメールアドレスからパートナー情報を取得する
     * @param _email Eメールアドレス
     * @returns パートナー情報
     */
    findAll(_email: string): Promise<Partner[]> {
        return new Promise((resolve, reject) => {
            // ユーザ情報を取得する
            this.userService.findByEmail(_email)
            .then((_user: IUser) => {
                if (!_user) {
                    reject('ユーザが登録されていません');
                }
                else {
                    // ユーザに登録されているパートナー情報を取得する
                    this.partnerRepository.find(
                        {
                            where: {userid: _user.id},
                            order: {birthday: 'DESC'}
                        })
                    .then((_partners: Partner[]) => {
                        resolve(_partners);
                    })
                    .catch((err) => {
                        reject(err);
                    });
                }
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * パートナー情報を削除する
     * @param _partner パートナー情報
     * @returns true:成功、false:エラー
     */
    remove(_partner: Partner): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // 指定されたIDのパートナー情報を削除する
            this.partnerRepository.remove(_partner)
            .then((_removePartner: Partner) => {
                resolve(true);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
