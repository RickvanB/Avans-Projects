import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Timeslot } from './timeslot';
import { RoundPutPost } from './interfaces/round';

@Entity()
export class Round {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    timestart!: string;

    @Column()
    timeend!: string;

    @OneToMany(type => Timeslot, timeslot => timeslot.round)
    timeslots?: Timeslot[];

    /**
     * replace
     */
    public replace(requestBody: RoundPutPost) {
        this.timeend = requestBody.timeend;
        this.timestart = requestBody.timestart;
    }
}