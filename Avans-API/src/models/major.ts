import {Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Student } from './student';
import { Company } from './company';
import { MajorPutPost } from './interfaces/major';
import { Timeslot } from './timeslot';

@Entity()
export class Major {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    shortName!: string;

    @Column()
    educationCode!: string;

    @Column()
    maxEnrollmentsPerCompany?: number;

    @Column()
    archived!: boolean;

    @OneToMany(type => Student, student => student.major)
    students?: Student[];
    
    @ManyToMany(type => Company, company => company.majors)
    companies?: Company[];

    @ManyToMany(type => Timeslot, timeslot => timeslot.excludedMajors)
    excludedFromTimeslots?: Timeslot[];

    public replace(requestBody: MajorPutPost) {
        this.name = requestBody.name;
        this.shortName = requestBody.shortName;
        this.educationCode = requestBody.educationCode;
        this.maxEnrollmentsPerCompany = requestBody.maxEnrollmentsPerCompany;
        this.archived = requestBody.archived;
    }

}
