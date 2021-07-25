import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable} from 'typeorm';
import { Round } from './round';
import { Student } from './student';
import { Speedmeet } from './speedmeet';
import { Company } from './company';
import { Major } from './major';
import { TimeslotPutPost } from './interfaces/timeslot';


@Entity()
export class Timeslot {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    shareCv?: boolean;

    @Column()
    enabled?: boolean;

    @Column()
    table?: number;

    @ManyToOne(type => Round, round => round.timeslots)
    @JoinColumn({name: 'roundId'})
    round?: Round;

    @ManyToOne(type => Student, student => student.timeslots, {nullable: true})
    student?: Student | null;

    @ManyToOne(type => Speedmeet, speedmeet => speedmeet.timeslots)
    speedmeet?: Speedmeet;

    @ManyToOne(type => Company, company => company.timeslots)
    company?: Company;

    @ManyToMany(type => Major, major => major.excludedFromTimeslots,{cascade: true})
    @JoinTable({name: 'excluded_timeslots_majors'})
    excludedMajors?: Major[];

    //todo: add relations

    /**
     * replace
     */
    public replace(requestBody: TimeslotPutPost) {
        this.shareCv = requestBody.shareCv;
        this.enabled = requestBody.enabled;
        
    }
}