import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IUser } from './interfaces/iuser.interface';
import { ObjectType, Field } from 'type-graphql';

/**
 * ユーザテーブル
 */
@ObjectType()
@Entity({name: 'user'})
export class User implements IUser {
    /**
     * ID
     */
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * 氏名
     */
    @Field()
    @Column()
    name: string;

    /**
     * 氏名カナ
     */
    @Field()
    @Column()
    kana: string;

    /**
     * Eメール
     */
    @Field()
    @Column()
    email: string;

    /**
     * 郵便番号
     */
    @Field()
    @Column()
    postcode: string;

    /**
     * 住所
     */
    @Field()
    @Column()
    address: string;

    /**
     * 電話番号
     */
    @Field()
    @Column()
    phone: string;

    /**
     * パスワード(ハッシュ値)
     */
    @Field()
    @Column()
    password: string;

    /**
     * 管理者
     * 2: システム管理者
     * 1: 管理者
     * 0: 一般
     */
    @Field()
    @Column()
    role: number;

    /**
     * 登録完了待ちフラグ
     *  1:登録完了待ち
     *  0:登録完了
     */
    @Field()
    @Column()
    isemailconfirmed: number;

    /**
     * パスワードリセットフラグ
     *  1: パスワードリセット中
     *  0: 通常
     */
    @Field()
    @Column()
    ispasswordreset: number;

    /**
     * 作成日
     */
    @Field()
    @CreateDateColumn()
    createdAt: Date;

    /**
     * 更新日
     */
    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    /**
     * 性別
     *  0: 男性
     *  1: 女性
     */
    @Field()
    sex: number;
}
