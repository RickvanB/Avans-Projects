import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Timeslot } from './timeslot';
import { SpeedmeetPutPost } from './interfaces/speedmeet';


@Entity()
export class Speedmeet {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    start?: string;

    @Column()
    end?: string;

    @Column()
    title?: string;

    @Column()
    description?: string;

    @Column()
    welcomeMessage?: string;

    @Column()
    enrollmentStart?: string;

    @Column()
    mapPath?: string;

    @Column()
    maxEnrollmentsPerStudent?: number;

    @OneToMany(type => Timeslot, timeslot => timeslot.speedmeet)
    timeslots?: Timeslot[];

    /**
     * replace
     */
    public replace(requestBody: SpeedmeetPutPost) {
        this.start = requestBody.start;
        this.end = requestBody.end;
        this.title = requestBody.title;
        this.description = requestBody.description;
        this.welcomeMessage = requestBody.welcomeMessage;
        this.enrollmentStart = requestBody.enrollmentStart;
        this.mapPath = requestBody.mapPath;
        this.maxEnrollmentsPerStudent = requestBody.maxEnrollmentsPerStudent;
    }

}