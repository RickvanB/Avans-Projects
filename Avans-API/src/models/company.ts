import {Column, Entity, PrimaryGeneratedColumn, OneToMany,ManyToMany,JoinTable,} from 'typeorm';

import {Contact} from './contact';
import {Timeslot} from './timeslot';
import {Major} from './major';
import {CompanyPutPost} from './interfaces/company';

// NOTE: This is an example entity/model

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column()
    description?: string;

    @Column()
    logoPath?: string;

    @Column()
    address?: string;

    @Column()
    city?: string;

    @Column()
    zipcode?: string;

    @Column()
    country?: string;

    @Column()
    website?: string;

    @Column()
    status?: number;

    @Column()
    tables?: number;

    @Column({select: false})
    banner?: string;

    @OneToMany(type => Contact, contact => contact.company)
    contacts?: Contact[];

    @OneToMany(type => Timeslot, timeslot => timeslot.company)
    timeslots?: Timeslot[];

    @ManyToMany(type => Major, major => major.companies)
    @JoinTable()
    majors?: Major[];

    /**
     * replace Company object
     */
    public replace(requestBody :CompanyPutPost) {
        this.name = requestBody.name;
        this.description = requestBody.description;
        this.logoPath = requestBody.logoPath;
        this.address = requestBody.address;
        this.city = requestBody.city;
        this.zipcode = requestBody.zipcode;
        this.country = requestBody.country;
        this.website = requestBody.website;
        this.status = requestBody.status;
        this.tables = requestBody.tables;
    }
}