import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';
import faker from 'faker';
import * as bcrypt from 'bcrypt';

faker.locale = 'nl';

export class sprint1Migration1583656610712 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        //speedmeet
        await queryRunner.createTable(
            new Table({
                name: 'speedmeet',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'start',
                        type: 'varchar(45)',
                        isNullable: true
                    },
                    {
                        name: 'end',
                        type: 'varchar(45)',
                        isNullable: false
                    },
                    {
                        name: 'title',
                        type: 'varchar(45)',
                        isNullable: false
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'welcomeMessage',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'enrollmentStart',
                        type: 'varchar(45)',
                        isNullable: false
                    },
                    {
                        name: 'mapPath',
                        type: 'longtext',
                        isNullable: true
                    },
                    {
                        name: 'maxEnrollmentsPerStudent',
                        type: 'int',
                        isNullable: false
                    }

                ]
            })
        );

        //company
        await queryRunner.createTable(
            new Table({
                name: 'company',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'parentCompanyId',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'name',
                        type: 'varchar(45)',
                        isNullable: false
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: true
                    },
                    {
                        name: 'website',
                        type: 'varchar(100)',
                        isNullable: true
                    },
                    {
                        name: 'logoPath',
                        type: 'varchar(100)',
                        isNullable: true
                    },
                    {
                        name: 'address',
                        type: 'varchar(45)',
                        isNullable: true
                    },
                    {
                        name: 'zipcode',
                        type: 'varchar(10)',
                        isNullable: true
                    },
                    {
                        name: 'city',
                        type: 'varchar(45)',
                        isNullable: true
                    },
                    {
                        name: 'country',
                        type: 'varchar(45)',
                        isNullable: true
                    },
                    {
                        name: 'status',
                        type: 'int',
                        isNullable: false,
                        default: 0
                    },
                    {
                        name: 'tables',
                        type: 'int',
                        isNullable: false,
                        default: 1
                    },
                    {
                        name: 'banner',
                        type: 'longtext',
                        isNullable: true
                    }
                ]
            })
        );
        
        

        //contact
        await queryRunner.createTable(
            new Table({
                name: 'contact',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'companyId',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'department',
                        type: 'varchar(45)',
                        isNullable: true
                    },
                    {
                        name: 'name',
                        type: 'varchar(25)',
                        isNullable: true
                    },
                    {
                        name: 'insertion',
                        type: 'varchar(20)',
                        isNullable: true
                    },
                    {
                        name: 'lastname',
                        type: 'varchar(45)',
                        isNullable: true
                    },
                    {
                        name: 'emailaddress',
                        type: 'varchar(100)',
                        isNullable: false
                    },
                    {
                        name: 'mainContact',
                        type: 'tinyint',
                        isNullable: false
                    },
                    {
                        name: 'receiveNewsletter',
                        type: 'tinyint',
                        isNullable: false
                    },
                    {
                        name: 'phone',
                        type: 'varchar(15)',
                        isNullable: true
                    },
                    {
                        name: 'phoneAlternative',
                        type: 'varchar(15)',
                        isNullable: true
                    },
                    {
                        name: 'password',
                        type: 'varchar(100)',
                        isNullable: true
                    },
                    {
                        name: 'internshipContact',
                        type: 'tinyint',
                        isNullable: true
                    }
                    
                ]
            })
        );


        //major
        await queryRunner.createTable(
            new Table({
                name: 'major',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'educationCode',
                        type: 'varchar(10)',
                        isNullable: false
                    },
                    {
                        name: 'name',
                        type: 'varchar(45)',
                        isNullable: false
                    },
                    {
                        name: 'shortName',
                        type: 'varchar(20)',
                        isNullable: false
                    },
                    {
                        name: 'archived',
                        type: 'boolean',
                        isNullable: false,
                        default: false
                    },
                    {
                        name: 'maxEnrollmentsPerCompany',
                        type: 'int',
                        isNullable: false
                    }                          
                ]
            })
        );
        //company_majors_major
        await queryRunner.createTable(
            new Table({
                name: 'company_majors_major',
                columns: [
                    {
                        name: 'companyId',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'majorId',
                        type: 'int',
                        isPrimary: true
                    }                 
                ]
            })
        );




        //student
        await queryRunner.createTable(
            new Table({
                name: 'student',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'majorId',
                        type: 'int',
                        isNullable: true,
                        default: null
                    },
                    {
                        name: 'name',
                        type: 'varchar(45)',
                        isNullable: false
                    },
                    {
                        name: 'lastname',
                        type: 'varchar(45)',
                        isNullable: false
                    },
                    {
                        name: 'avansId',
                        type: 'varchar(45)',
                        isNullable: false
                    },
                    {
                        name: 'cv',
                        type: 'longtext',
                        isNullable: true
                    },
                    {
                        name: 'aboutMe',
                        type: 'varchar(255)',
                        isNullable: true
                    }                            
                ]
            })
        );

        //Employee
        await queryRunner.createTable(
            new Table({
                name: 'employee',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar(45)',
                        isNullable: false
                    },
                    {
                        name: 'lastname',
                        type: 'varchar(45)',
                        isNullable: false
                    },
                    {
                        name: 'avansId',
                        type: 'varchar(45)',
                        isNullable: false
                    },
                    {
                        name: 'usertype',
                        type: 'int',
                        isNullable: true
                    },                          
                ]
            })
        );

        //round
        await queryRunner.createTable(
            new Table({
                name: 'round',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'timestart',
                        type: 'varchar(45)',
                        isNullable: false
                    },
                    {
                        name: 'timeend',
                        type: 'varchar(45)',
                        isNullable: false
                    }                        
                ]
            })
        );

        //timeslot
        await queryRunner.createTable(
            new Table({
                name: 'timeslot',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isUnique: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'roundId',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'speedmeetId',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'companyId',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'studentId',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'shareCv',
                        type: 'boolean',
                        isNullable: false
                    },
                    {
                        name: 'enabled',
                        type: 'boolean',
                        isNullable: false,
                        default: true
                    },
                    {
                        name: 'table',
                        type: 'int',
                        isNullable: false,
                        default: 1
                    }    

                ]
            })
        );

        //company_majors_major
        await queryRunner.createTable(
            new Table({
                name: 'excluded_timeslots_majors',
                columns: [
                    {
                        name: 'timeslotId',
                        type: 'int',
                        isPrimary: true
                    },
                    {
                        name: 'majorId',
                        type: 'int',
                        isPrimary: true
                    }                 
                ]
            })
        );

        //set foreign key constraints
        await queryRunner.createForeignKey('company', new TableForeignKey({
            columnNames: ['parentCompanyId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'company',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('contact', new TableForeignKey({
            columnNames: ['companyId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'company',
            onDelete: 'CASCADE'
        }));


        await queryRunner.createForeignKey('student', new TableForeignKey({
            columnNames: ['majorId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'major',
            onDelete: 'CASCADE'
        }));


        await queryRunner.createForeignKey('timeslot', new TableForeignKey({
            columnNames: ['roundId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'round',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('timeslot', new TableForeignKey({
            columnNames: ['speedmeetId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'speedmeet',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('timeslot', new TableForeignKey({
            columnNames: ['companyId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'company',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('timeslot', new TableForeignKey({
            columnNames: ['studentId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'student',
            onDelete: 'CASCADE'
        }));

        //lookup comapnies major
        await queryRunner.createForeignKey('company_majors_major', new TableForeignKey({
            columnNames: ['companyId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'company',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('company_majors_major', new TableForeignKey({
            columnNames: ['majorId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'major',
            onDelete: 'CASCADE'
        }));

        //lookup comapnies major
        await queryRunner.createForeignKey('excluded_timeslots_majors', new TableForeignKey({
            columnNames: ['timeslotId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'timeslot',
            onDelete: 'CASCADE'
        }));

        await queryRunner.createForeignKey('excluded_timeslots_majors', new TableForeignKey({
            columnNames: ['majorId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'major',
            onDelete: 'CASCADE'
        }));

        //Speedmeet TEST DATA
        await queryRunner.query('INSERT INTO speedmeet (start, end, title, description, welcomeMessage, enrollmentStart, maxEnrollmentsPerStudent) values ( "2020-03-03 09:00:00", "2020-03-03 17:00:00","Afstudeerstage","Speedmeet voor het vinden van een afstudeerstage", "Welkom bij de speedmeet app voor het vinden van een asftudeer stage","begin inschrijven",3)');
        
        //Company TEST DATA
        for(let i = 0; i < 100; i++) {
            await queryRunner.query('INSERT INTO company (id, name, description, address, zipcode, city, country, logoPath, website, status) values (?, ?, ?, ?, ?, ?, ?, ?, ?, 2)', [
                i + 1,
                faker.company.companyName(),
                faker.lorem.paragraph(5),
                faker.address.streetAddress(),
                faker.address.zipCode(),
                faker.address.city(),
                'Nederland',
                'https://i.picsum.photos/id/866/500/300.jpg',
                faker.internet.url()
            ]);
        }


        await queryRunner.query('INSERT INTO contact (companyId, department, name, lastname, emailaddress, phone, mainContact, receiveNewsletter, password) values (1, "It support", "Xandor", "Janssen", "Xandor@Janssen.nl", "0645565753", 1, 0, "' + bcrypt.hashSync('Janssen', 10) + '")');
        //Contact TEST DATA
        for(let i = 0; i < 100; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();

            await queryRunner.query('INSERT INTO contact (companyId, department, name, lastname, emailaddress, phone, mainContact, receiveNewsletter, password) values (?, ?, ?, ?, ?, ?, 1, 0, "$2b$10$7V8McaeglyYYXKrSDOjvK.JhSITAR4f.UMBXoRORktMWuyhs6HolS")', [
                i + 1,
                faker.name.jobTitle(),
                firstName,
                lastName,
                faker.internet.email(firstName, lastName),
                faker.phone.phoneNumber()
            ]);
        }

        //Major TEST DATA
        await queryRunner.query('INSERT INTO major (educationCode, name, shortName, maxEnrollmentsPerCompany) values ("I-H", "Software Ontwikkeling", "SO", "10")');
        await queryRunner.query('INSERT INTO major (educationCode, name, shortName, maxEnrollmentsPerCompany) values ("I-H", "Bedrijfs Informatica", "BI", "10")');
        await queryRunner.query('INSERT INTO major (educationCode, name, shortName, maxEnrollmentsPerCompany) values ("CMD", "Communicatie Multimedia Design", "CMD", "10")');

        //Student TEST DATA
        for(let i = 0; i < 100; i++) {
            const firstName = faker.name.firstName();
            const lastName = faker.name.lastName();
            const avansId = firstName.toLowerCase().substr(0, 1) + lastName.toLowerCase() + (i + 1);

            await queryRunner.query('INSERT INTO student (majorId, name, lastname, avansId, cv) values (1, ?, ?, ?, "base64")', [
                firstName,
                lastName,
                avansId
            ]);
            
        }
        //Employee Seed
        await queryRunner.query('INSERT INTO employee (name, lastname, avansId, usertype) values ("Mark", "Groenendaal", "manmgroe", 3)');

        //Employee Test DAta
        await queryRunner.query('INSERT INTO employee (name, lastname, avansId, usertype) values ("Xandor", "Janssen", "xpjhjans", 3)');

        //Round SEED DATA
        await queryRunner.query('INSERT INTO round (id, timestart, timeend) values \
        (1, "09:45", "09:55"),\
        (2, "09:55", "10:05"),\
        (3, "10:05", "10:15"),\
        (4, "10:15", "10:25"),\
        (5, "10:25", "10:35"),\
        (6, "10:35", "10:45"),\
        (7, "10:45", "10:55"),\
        (8, "11:10", "11:20"),\
        (9, "11:20", "11:30"),\
        (10, "11:30", "11:40"),\
        (11, "11:40", "11:50"),\
        (12, "11:50", "12:00"),\
        (13, "12:00", "12:10")');
        
        // Timeslot TEST DATA
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, studentId, shareCv) values (1, 1, 1, 1, 0)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, studentId, shareCv) values (2, 1, 1, 2, 0)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, studentId, shareCv) values (3, 1, 1, 3, 0)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (4, 1, 1, 0)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (5, 1, 1, 0)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (6, 1, 1, 0)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (7, 1, 1, 0)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (8, 1, 1, 0)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (9, 1, 1, 0)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (10, 1, 1, 0)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (11, 1, 1, 0)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (12, 1, 1, 0)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (13, 1, 1, 0)');

        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, studentId, shareCv, `table`) values (1, 1, 1, 4, 0, 2)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, studentId, shareCv, `table`) values (2, 1, 1, 5, 0, 2)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, studentId, shareCv, `table`) values (3, 1, 1, 6, 0, 2)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv, `table`) values (4, 1, 1, 0, 2)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv, `table`) values (5, 1, 1, 0, 2)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv, `table`) values (6, 1, 1, 0, 2)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv, `table`) values (7, 1, 1, 0, 2)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv, `table`) values (8, 1, 1, 0, 2)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv, `table`) values (9, 1, 1, 0, 2)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv, `table`) values (10, 1, 1, 0, 2)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv, `table`) values (11, 1, 1, 0, 2)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv, `table`) values (12, 1, 1, 0, 2)');
        await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv, `table`) values (13, 1, 1, 0, 2)');

        for(let i = 1; i < 100; i++) {
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (1, 1, ?, 0)', [i + 1]);
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (2, 1, ?, 0)', [i + 1]);
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (3, 1, ?, 0)', [i + 1]);
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (4, 1, ?, 0)', [i + 1]);
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (5, 1, ?, 0)', [i + 1]);
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (6, 1, ?, 0)', [i + 1]);
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (7, 1, ?, 0)', [i + 1]);
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (8, 1, ?, 0)', [i + 1]);
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (9, 1, ?, 0)', [i + 1]);
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (10, 1, ?, 0)', [i + 1]);
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (11, 1, ?, 0)', [i + 1]);
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (12, 1, ?, 0)', [i + 1]);
            await queryRunner.query('INSERT INTO timeslot (roundId, speedmeetId, companyId, shareCv) values (13, 1, ?, 0)', [i + 1]);
        }

        //Company_majors_major TEST DATA
        for (let i = 0; i < 100; i++) {
            await queryRunner.query('INSERT INTO company_majors_major (companyId, majorId) values (?, 1)', [i + 1]);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('company_majors_major');
        await queryRunner.dropTable('excluded_timeslots_majors');
        await queryRunner.dropTable('timeslot');
        await queryRunner.dropTable('round');
        await queryRunner.dropTable('student');
        await queryRunner.dropTable('major');
        await queryRunner.dropTable('contact');
        await queryRunner.dropTable('company');
        await queryRunner.dropTable('speedmeet');
        await queryRunner.dropTable('employee');
    }
}
