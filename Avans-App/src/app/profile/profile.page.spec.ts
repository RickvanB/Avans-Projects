import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { SpeedmeetService } from '../services/speedmeet.service';
import { TimeslotService } from '../services/timeslot.service';
import { AuthService } from '../services/auth.service';
import { getSpeedmeetServiceSpy, getAuthServiceSpy, getStudentSerivceSpy } from 'src/testing/service-spies';
import { BehaviorSubject, Subject } from 'rxjs';
import { Timeslot } from '../models/timeslot';
import { testData } from 'src/testing/test-data';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentService } from '../services/student.service';

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
let studentServiceSpy;

const expectedCompany = testData().companies[0];
const expectedTimeslots = testData().timeslots;
const expectedSpeedmeet = testData().speedmeet;
const expectedStudent = testData().student;

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async(() => {
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
    studentServiceSpy = getStudentSerivceSpy(expectedStudent);

    TestBed.configureTestingModule({
      declarations: [ ProfilePage ],
      imports: [IonicModule.forRoot(), FormsModule, RouterTestingModule],
      providers: [
        { provide: TimeslotService, useValue: timeslotServiceSpy },
        { provide: SpeedmeetService, useValue: speedmeetServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: StudentService, useValue: studentServiceSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
