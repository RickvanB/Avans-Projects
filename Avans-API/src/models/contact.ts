import {Column, Entity, PrimaryGeneratedColumn, ManyToOne, AfterLoad, BeforeUpdate, BeforeInsert} from 'typeorm';
import { Company } from './company';
import { ContactPutPost } from './interfaces/contact';
import * as bcrypt from 'bcrypt';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    department?: string;

    @Column()
    name?: string;

    @Column()
    insertion?: string;

    @Column()
    lastname?: string;

    @Column()
    emailaddress!: string;

    @Column()
    mainContact?: boolean;

    @Column()
    receiveNewsletter?: boolean;

    @Column()
    phone?: string;
    
    @Column()
    phoneAlternative?: string;

    @Column({ select: false })
    password?: string;

    private tempPassword?: string;

    @AfterLoad()
    //@ts-ignore Is Used.
    private loadTempPassword(): void {
        this.tempPassword = this.password;
    }

    @BeforeUpdate()
    @BeforeInsert()
    //@ts-ignore Is Used.
    private hashPassword(): void {
        if (this.tempPassword != this.password) {
            console.log('Change');
            if (this.password) {
                this.password = bcrypt.hashSync(this.password, 10);
            }
        }
    }

    @Column()
    internshipContact?: boolean; //Contact voor student?

    @ManyToOne(type => Company, company => company.contacts)
    company?: Company;

    /**
     * replace
     */
    public replace(requestBody: ContactPutPost) {
        this.name = requestBody.name;
        this.department = requestBody.department;
        this.insertion = requestBody.insertion;
        this.lastname = requestBody.lastname;
        this.emailaddress = requestBody.emailaddress;
        this.mainContact = requestBody.mainContact;
        this.receiveNewsletter = requestBody.receiveNewsletter;
        this.phone = requestBody.phone;
        this.phoneAlternative = requestBody.phoneAlternative;
        this.password = requestBody.password;
        this.internshipContact = requestBody.internshipContact;
    }
}
