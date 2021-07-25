import { UserType } from '../speedmeetJwt';

/**
 * @tsoaModel
 */
export interface Employee {
    id?: number;
    name: string;
    lastname: string;
    avansId: string;
    usertype?: UserType;
}


export interface EmployeePost {
    name: string;
    lastname: string;
    avansId: string;
    usertype: UserType;
}