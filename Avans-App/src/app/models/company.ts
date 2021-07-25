import { Contactperson } from './contactperson';
import {Major} from './major';
import {Timeslot} from './timeslot';
import {CompanyStatus} from './companyStatus.enum';

export class Company {
    public id: number;
    public name: string;
    public description: string;
    public logoPath: string;
    public address: string;
    public city: string;
    public zipcode: string;
    public country: string;
    public website: string;
    public contacts: Contactperson[];
    public majors: Major[];
    public timeslots: Timeslot[];
    public status: CompanyStatus;
}
