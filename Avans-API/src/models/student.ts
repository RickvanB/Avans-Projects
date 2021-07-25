import {Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne} from 'typeorm';
import { Timeslot } from './timeslot';
import { Major } from './major';

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    avansId!: string;

    @Column({select: false})
    cv?: string;

    @Column()
    aboutMe?: string;

    @OneToMany(type => Timeslot, timeslot => timeslot.student)
    timeslots?: Timeslot[];

    @ManyToOne(type => Major, major => major.students)
    major?: Major;

    //todo: add relations

}


