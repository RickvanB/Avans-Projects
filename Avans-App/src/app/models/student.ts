import { Major } from './major';

export enum UserType {
    STUDENT = 0,
    COMPANY = 1,
    ADMIN = 2,
    SUPERADMIN = 3
}

export class Student {
    public id: number;
    public major: Major | string;
    public name: string;
    public lastName: string;
    public avansId: string;
    public aboutMe: string;
    public hasCV: boolean;
    public type: UserType;
}
