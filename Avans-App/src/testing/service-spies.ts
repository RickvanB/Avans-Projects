// tslint:disable-next-line:no-reference
/// <reference path="../../node_modules/@types/jasmine/ts3.1/index.d.ts"/>
import {Student} from '../app/models/student';
import {BehaviorSubject, Observable} from 'rxjs';
import {Company} from '../app/models/company';
import {Timeslot} from '../app/models/timeslot';
import {Speedmeet} from '../app/models/speedmeet';
import {Major} from '../app/models/major';

export function getRouterSpy(): {
    navigate: jasmine.Spy
} {
    return jasmine.createSpyObj('Router', ['navigate']);
}

export function getAuthServiceSpy(student: Student): {
    getAccessToken: jasmine.Spy,
    setAccessToken: jasmine.Spy,
    removeAccessToken: jasmine.Spy,
    getStudent: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('AuthService', [
        'getAccessToken',
        'setAccessToken',
        'removeAccessToken',
        'getStudent'
    ]);

    spy.getAccessToken.and.returnValue('');
    spy.getStudent.and.returnValue(student);

    return spy;
}

export function getCompanyServiceSpy(companies: Company[]): {
    getCompany: jasmine.Spy,
    getCompanies: jasmine.Spy,
    getBanner: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('CompanyService', [
        'getCompany',
        'getCompanies',
        'getBanner'
    ]);

    spy.getCompany.and.returnValue(new BehaviorSubject<Company>(companies[0]));
    spy.getCompanies.and.returnValue(new BehaviorSubject<Company[]>(companies));
    spy.getBanner.and.returnValue(new Observable());

    return spy;
}

export function getTimeslotServiceSpy(timeslots: Timeslot[]): {
    getTimeslotsOfCompany: jasmine.Spy,
    getTimeslotsOfStudent: jasmine.Spy,
    getTimeslot: jasmine.Spy,
    claimTimeslot: jasmine.Spy,
    releaseTimeslot: jasmine.Spy,
    observeTimeslotsByCompany: jasmine.Spy,
    subscribeToCompanyRoom: jasmine.Spy,
    unsubscribeFromCompanyRoom: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('TimeslotService', [
        'getTimeslotsOfCompany',
        'getTimeslotsOfStudent',
        'getTimeslot',
        'claimTimeslot',
        'releaseTimeslot',
        'observeTimeslotsByCompany',
        'subscribeToCompanyRoom',
        'unsubscribeFromCompanyRoom'
    ]);

    spy.getTimeslotsOfCompany.and.returnValue(new BehaviorSubject<Timeslot[]>(timeslots));
    spy.getTimeslotsOfStudent.and.returnValue(new BehaviorSubject<Timeslot[]>(timeslots));
    spy.getTimeslot.and.returnValue(new BehaviorSubject<Timeslot>(timeslots[0]));
    spy.claimTimeslot.and.returnValue(new Observable());
    spy.releaseTimeslot.and.returnValue(new Observable());
    spy.observeTimeslotsByCompany.and.returnValue(new BehaviorSubject<Timeslot>(timeslots[0]));

    return spy;
}

export function getSpeedmeetServiceSpy(speedmeet: Speedmeet): {
    getLatestSpeedmeet: jasmine.Spy,
    observeSpeedmeet: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('SpeedmeetService', ['getLatestSpeedmeet', 'observeSpeedmeet', 'getSpeedmeetMap']);
    spy.getLatestSpeedmeet.and.returnValue(new BehaviorSubject<Speedmeet>(speedmeet));
    spy.observeSpeedmeet.and.returnValue(new Observable());
    spy.getSpeedmeetMap.and.returnValue(new Observable());

    return spy;
}

export function getMajorServiceSpy(majors: Major[]): {
    getMajorsByEducation: jasmine.Spy,
    assignMajorToStudent: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('MajorService', ['getMajorsByEducation', 'assignMajorToStudent']);
    spy.getMajorsByEducation.and.returnValue(new BehaviorSubject<Major[]>(majors));
    spy.assignMajorToStudent.and.returnValue(new Observable());

    return spy;
}

export function getStudentSerivceSpy(student: Student): {
    getStudent: jasmine.Spy,
    patchStudent: jasmine.Spy,
    patchStudentCV: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('StudentService', ['getStudent', 'patchStudent', 'patchStudentCV']);
    spy.getStudent.and.returnValue(new BehaviorSubject<Student>(student));
    spy.patchStudent.and.returnValue(new Observable());
    spy.patchStudentCV.and.returnValue(new Observable());

    return spy;
}
