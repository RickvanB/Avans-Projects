import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TimeslotListComponent } from './timeslot-list.component';
import {testData} from '../../../testing/test-data';
import {TimeslotService} from '../../services/timeslot.service';
import {AuthService} from '../../services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {getAuthServiceSpy, getRouterSpy, getSpeedmeetServiceSpy, getTimeslotServiceSpy} from '../../../testing/service-spies';
import {SpeedmeetService} from '../../services/speedmeet.service';

let timeslotServiceSpy;
let authServiceSpy;
let routerSpy;
let speedmeetServiceSpy;
const expectedTimeslots = testData().timeslots;
const expectedStudent = testData().student;
const expectedSpeedmeet = testData().speedmeet;

describe('TimeslotListComponent', () => {
  let component: TimeslotListComponent;
  let fixture: ComponentFixture<TimeslotListComponent>;

  beforeEach(async(() => {
    timeslotServiceSpy = getTimeslotServiceSpy(expectedTimeslots);
    authServiceSpy = getAuthServiceSpy(expectedStudent);
    routerSpy = getRouterSpy();
    speedmeetServiceSpy = getSpeedmeetServiceSpy(expectedSpeedmeet);

    TestBed.configureTestingModule({
      declarations: [ TimeslotListComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: TimeslotService, useValue: timeslotServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: SpeedmeetService, useValue: speedmeetServiceSpy }
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeslotListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load student', () => {
    expect(authServiceSpy.getStudent.calls.count()).toEqual(1);
    expect(component.student).toEqual(expectedStudent);
  });

  it('should load timeslots', () => {
    component.loadTimeslots();

    expect(timeslotServiceSpy.getTimeslotsOfStudent.calls.count()).toEqual(1);
    expect(timeslotServiceSpy.getTimeslotsOfStudent.calls.first().args[0]).toEqual(expectedStudent.id);
    expect(component.timeslots).toEqual(expectedTimeslots);
  });

  it('should navigate to company', () => {
    component.gotoCompany(1);

    expect(routerSpy.navigate.calls.count()).toEqual(1);
  });
});
