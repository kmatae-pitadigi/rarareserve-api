import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, InputType, Field } from 'type-graphql';
import { IPartner } from './interfaces/ipartner.interface';

/**
 * パートナーテーブル
 */
@ObjectType('Partner')
@InputType('PartnerInput')
@Entity({name: 'partner'})
export class Partner implements IPartner {
    /**
     * ID
     */
    @Field({nullable: true})
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    /**
     * ユーザID
     */
    @Field()
    @Column()
    userid: string;

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
     * 誕生日ｓ
     */
    @Field()
    @Column()
    birthday: Date;
}
