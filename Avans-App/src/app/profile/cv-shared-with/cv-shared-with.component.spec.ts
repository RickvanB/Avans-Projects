import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CvSharedWithComponent } from './cv-shared-with.component';
import { Timeslot } from 'src/app/models/timeslot';
import { Subject, BehaviorSubject } from 'rxjs';
import { getSpeedmeetServiceSpy, getAuthServiceSpy } from 'src/testing/service-spies';
import { testData } from 'src/testing/test-data';
import { TimeslotService } from 'src/app/services/timeslot.service';
import { SpeedmeetService } from 'src/app/services/speedmeet.service';
import { AuthService } from 'src/app/services/auth.service';

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

describe('CvSharedWithComponent', () => {
  let component: CvSharedWithComponent;
  let fixture: ComponentFixture<CvSharedWithComponent>;

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


    TestBed.configureTestingModule({
      declarations: [ CvSharedWithComponent ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: TimeslotService, useValue: timeslotServiceSpy },
        { provide: SpeedmeetService, useValue: speedmeetServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CvSharedWithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
