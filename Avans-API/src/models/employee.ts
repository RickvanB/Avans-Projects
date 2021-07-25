import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Employee as IEmployee} from './interfaces/employee';

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    lastname!: string;

    @Column()
    avansId!: string;

    @Column()
    usertype?: Number;

    /**
     * replace
     */
    public replace(requestBody: IEmployee) {
        this.avansId = requestBody.avansId;
        this.name = requestBody.name;
        this.lastname = requestBody.lastname;
        this.usertype = requestBody.usertype;
    }

}


