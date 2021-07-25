import { Timeslot } from './timeslot';

export class Speedmeet {
    public id: number;
    public start: string;
    public end: string;
    public title: string;
    public description: string;
    public welcomeMessage: string;
    public enrollmentStart: string;
    public mapPath: string;
    public maxEnrollmentsPerStudent: number;
    public timeslots: Timeslot[];
}
