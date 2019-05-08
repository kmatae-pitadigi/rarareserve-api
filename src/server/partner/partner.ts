import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { IPartner } from './interfaces/ipartner.interface';
import { User } from '../user/user';

/**
 * パートナーテーブル
 */
@ObjectType()
@Entity({name: 'partner'})
export class Partner implements IPartner {
    /**
     * ID
     */
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /**
     * ユーザ
     */
    @Field(type => User)
    @ManyToOne(type => User, user => user.partners)
    @JoinColumn({ name: 'userid' })
    user: User;

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
    @Column()
    sex: number;
}
