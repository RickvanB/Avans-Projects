import { Company } from './company';
import { Student } from './student';
import {Round} from './round';

export class Timeslot {
    public id: number;
    public company: Company;
    public student?: Student;
    public shareCv: boolean;
    public round: Round;
}
