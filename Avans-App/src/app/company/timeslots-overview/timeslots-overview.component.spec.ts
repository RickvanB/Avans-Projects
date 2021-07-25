import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimeslotsOverviewComponent } from './timeslots-overview.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRouteStub} from '../../../testing/activated-route-stub';
import {testData} from '../../../testing/test-data';
import {BehaviorSubject, Subject} from 'rxjs';
import {Timeslot} from '../../models/timeslot';
import {ActivatedRoute} from '@angular/router';
import {TimeslotService} from '../../services/timeslot.service';
import {getAuthServiceSpy, getSpeedmeetServiceSpy} from '../../../testing/service-spies';
import {SpeedmeetService} from '../../services/speedmeet.service';
import {AuthService} from '../../services/auth.service';

let activatedRouteStub: ActivatedRouteStub;
let timeslotServiceSpy: {
  subscribeToCompanyRoom: jasmine.Spy,
  getTimeslotsOfCompany: jasmine.Spy,
  observeTimeslotsByCompany: jasmine.Spy,
  stopObservingCompany: jasmine.Spy,
  getTimeslotsOfStudent: jasmine.Spy
};
let timeslotSubject: Subject<Timeslot>;
let speedmeetServiceSpy;
let authServiceSpy;

const expectedCompany = testData().companies[0];
const expectedTimeslots = testData().timeslots;
const expectedSpeedmeet = testData().speedmeet;
const expectedStudent = testData().student;

describe('TimeslotsOverviewComponent', () => {
  let component: TimeslotsOverviewComponent;
  let fixture: ComponentFixture<TimeslotsOverviewComponent>;

  beforeEach(() => {
    activatedRouteStub = new ActivatedRouteStub({id: expectedCompany.id.toString(10)});

    timeslotSubject = new Subject<Timeslot>();

    timeslotServiceSpy = jasmine.createSpyObj('TimeslotService', [,
      'subscribeToCompanyRoom',
      'getTimeslotsOfCompany',
      'observeTimeslotsByCompany',
      'unsubscribeFromCompanyRoom',
      'getTimeslotsOfStudent'
    ]);
    timeslotServiceSpy.getTimeslotsOfCompany.and.returnValue(new BehaviorSubject<Timeslot[]>(expectedTimeslots));
    timeslotServiceSpy.observeTimeslotsByCompany.and.returnValue(timeslotSubject.asObservable());
    timeslotServiceSpy.getTimeslotsOfStudent.and.returnValue(new BehaviorSubject<Timeslot[]>(expectedTimeslots));

    speedmeetServiceSpy = getSpeedmeetServiceSpy(expectedSpeedmeet);
    authServiceSpy = getAuthServiceSpy(expectedStudent);

    TestBed.configureTestingModule({
      declarations: [ TimeslotsOverviewComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: TimeslotService, useValue: timeslotServiceSpy },
        { provide: SpeedmeetService, useValue: speedmeetServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ],
      imports: [
          IonicModule.forRoot(),
          RouterTestingModule,
          HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load timeslots', () => {
    expect(timeslotServiceSpy.getTimeslotsOfCompany.calls.count()).toEqual(1);
    expect(timeslotServiceSpy.getTimeslotsOfCompany.calls.first().args[0]).toEqual(expectedCompany.id);
    expect(component.allTimeslots).toEqual(expectedTimeslots);
  });

  it('should watch for changes', () => {
    expect(timeslotServiceSpy.subscribeToCompanyRoom.calls.count()).toEqual(1);
    expect(timeslotServiceSpy.subscribeToCompanyRoom.calls.first().args[0]).toEqual(expectedCompany.id);
    expect(timeslotServiceSpy.observeTimeslotsByCompany.calls.count()).toEqual(1);
  });

  it('should replace timeslot in list when new timeslot received', () => {
    const timeslotId = component.allTimeslots[0].id;
    const newTimeslot = {
      id: timeslotId,
      company: expectedTimeslots[0].company,
      round: {
        id: 1,
        timestart: '09:00',
        timeend: '09:15'
      },
      shareCv: false,
      student: testData().student
    };

    timeslotSubject.next(newTimeslot);

    const timeslotIndex = component.allTimeslots.findIndex(item => item.id === timeslotId);

    expect(timeslotIndex).toBeGreaterThanOrEqual(0);
    expect(component.allTimeslots[timeslotIndex]).toBe(newTimeslot);
  });

  it('should not add timeslot when timeslot not in the list', () => {
    const timeslotId = 5;
    const newTimeslot = {
      id: timeslotId,
      company: expectedTimeslots[0].company,
      round: {
        id: 1,
        timestart: '09:00',
        timeend: '09:15'
      },
      shareCv: false,
      student: testData().student
    };

    timeslotSubject.next(newTimeslot);

    const timeslotIndex = component.allTimeslots.findIndex(item => item.id === timeslotId);

    expect(timeslotIndex).toBe(-1);
  });
});
