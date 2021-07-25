import {Major} from './major';
/**
 * @tsoaModel
 */
export class SpeedmeetJwt {
    type: UserType;
    id: number;
    name: string;
    lastname: string;
    //Student/Admin Props (Avans SSO)
    major?: Major;

    //Company Props
    companyId?: number;

    constructor(type: UserType, id: number, name: string, lastname: string, major?: Major, companyId?: number) {
        this.type = type;
        this.id = id;
        this.name = name;
        this.lastname = lastname;

        this.major = major;
        this.companyId = companyId;
    }
}

export enum UserType {
    STUDENT = 0,
    COMPANY = 1,
    ADMIN = 2,
    SUPERADMIN = 3
}
