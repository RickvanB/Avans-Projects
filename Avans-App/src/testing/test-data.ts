import {Company} from '../app/models/company';
import {Timeslot} from '../app/models/timeslot';
import {Speedmeet} from '../app/models/speedmeet';
import {Student, UserType} from '../app/models/student';
import {CompanyStatus} from '../app/models/companyStatus.enum';
import {Major} from '../app/models/major';

export function testData() {
    const majors: Major[] = [
        {
            id: 1,
            name: 'Software ontwikkeling',
            shortName: 'SO',
            educationCode: 'I-H',
            maxEnrollmentsPerCompany: 10,
            archived: false
        },
        {
            id: 2,
            name: 'Bedrijfs Informatica',
            shortName: 'BI',
            educationCode: 'I-H',
            maxEnrollmentsPerCompany: 10,
            archived: false
        }
    ];

    const student: Student = {
        id: 1,
        avansId: 'dberkel1',
        name: 'Daan',
        lastName: 'van Berkel',
        major: majors[0],
        hasCV: true,
        aboutMe: 'Hallo, ik ben Daan.',
        type: UserType.STUDENT
    };

    const companies: Company[] = [
        {
            id: 1,
            name: 'Test 1',
            address: 'Test 1',
            zipcode: '1234aa',
            city: 'Test',
            country: 'NL',
            website: 'test.nl',
            description: 'Mooi stukje tekst',
            logoPath: 'asd.png',
            contacts: [],
            majors,
            timeslots: [],
            status: CompanyStatus.PARTICIPATING
        },
        {
            id: 2,
            name: 'Test 2',
            address: 'Test 2',
            zipcode: '1234aa',
            city: 'Test',
            country: 'NL',
            website: 'test.nl',
            description: 'Mooi stukje tekst',
            logoPath: 'asd.png',
            contacts: [],
            majors: [majors[0]],
            timeslots: [],
            status: CompanyStatus.PARTICIPATING
        },
        {
            id: 3,
            name: 'Test 3',
            address: 'Test 3',
            zipcode: '1234aa',
            city: 'Test',
            country: 'NL',
            website: 'test.nl',
            description: 'Mooi stukje tekst',
            logoPath: 'asd.png',
            contacts: [],
            majors: [majors[1]],
            timeslots: [],
            status: CompanyStatus.PARTICIPATING
        }
    ];

    const timeslots: Timeslot[] = [
        {
            id: 1,
            company: companies[0],
            student,
            shareCv: false,
            round: {
                id: 1,
                timestart: '09:00',
                timeend: '09:15'
            }
        },
        {
            id: 2,
            company: companies[0],
            student: null,
            shareCv: false,
            round: {
                id: 1,
                timestart: '09:00',
                timeend: '09:15'
            }
        },
        {
            id: 3,
            company: companies[0],
            student: null,
            shareCv: false,
            round: {
                id: 1,
                timestart: '09:00',
                timeend: '09:15'
            }
        }
    ];

    const speedmeet: Speedmeet = {
        id: 1,
        title: 'Speedmeet AI&I',
        description: 'Mooi tekstje',
        start: '2020-02-02T09:00:00',
        end: '2020-02-02T12:00:00',
        enrollmentStart: '2020-01-02T09:00:00',
        mapPath: 'asd.png',
        maxEnrollmentsPerStudent: 20,
        timeslots: [],
        welcomeMessage: 'Hoi allemaal'
    };

    return {
        companies,
        timeslots,
        speedmeet,
        student,
        majors
    };
}
