import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, InputType, Field } from 'type-graphql';
import { ICourse } from '../interfaces/icourse.interface';

@ObjectType('Course')
@InputType('CourseInput')
@Entity({name: 'course'})
export class Course implements ICourse {
    @Field({nullable: true})
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Field({nullable: true})
    @Column()
    no: number;

    @Field()
    @Column()
    name: string;

    @Field({nullable: true})
    @Column()
    description1?: string;

    @Field({nullable: true})
    @Column()
    description2?: string;

    @Field({nullable: true})
    @Column()
    description3?: string;

    @Field()
    @Column()
    starttime: Date;

    @Field()
    @Column()
    endtime: Date;

    @Field()
    @Column()
    color: string;

    @Field({nullable: true})
    @CreateDateColumn()
    createdAt?: Date;

    @Field({nullable: true})
    @UpdateDateColumn()
    updatedAt?: Date;
}
