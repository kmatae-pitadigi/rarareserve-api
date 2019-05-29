import 'reflect-metadata';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IUser } from './interfaces/iuser.interface';
import { ObjectType, InputType, Field } from 'type-graphql';

/**
 * ユーザテーブル
 */
@ObjectType('User')
@InputType('UserInput')
@Entity({name: 'user'})
export class User implements IUser {
    /**
     * ID
     */
    @Field({nullable: true})
    @PrimaryGeneratedColumn('uuid')
    id?: string;

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
    @Field({nullable: true})
    @Column()
    postcode?: string;

    /**
     * 住所
     */
    @Field({nullable: true})
    @Column()
    address?: string;

    /**
     * 電話番号
     */
    @Field({nullable: true})
    @Column()
    phone?: string;

    /**
     * パスワード(ハッシュ値)
     */
    @Field({nullable: true})
    @Column()
    password?: string;

    /**
     * ロール
     * 2: システム管理者
     * 1: スタッフ
     * 0: 一般
     */
    @Field()
    @Column()
    role: number;

    /**
     * 登録完了待ちフラグ
     *  0:登録完了待ち
     *  1:登録完了
     */
    @Field({nullable: true})
    @Column()
    isemailconfirmed?: boolean;

    /**
     * パスワードリセットフラグ
     *  1: パスワードリセット中
     *  0: 通常
     */
    @Field({nullable: true})
    @Column()
    ispasswordreset?: boolean;

    /**
     * 作成日
     */
    @Field({nullable: true})
    @CreateDateColumn()
    createdAt?: Date;

    /**
     * 更新日
     */
    @Field({nullable: true})
    @UpdateDateColumn()
    updatedAt?: Date;

    /**
     * 性別
     *  0: 男性
     *  1: 女性
     */
    @Field()
    @Column()
    sex: number;

    /**
     * 誕生日
     */
    @Field({nullable: true})
    @Column()
    birthday?: Date;
}
