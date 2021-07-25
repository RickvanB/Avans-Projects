import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompanyPage } from './company.page';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRouteStub} from '../../testing/activated-route-stub';
import {testData} from '../../testing/test-data';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../services/company.service';
import {AuthService} from '../services/auth.service';
import {getAuthServiceSpy, getCompanyServiceSpy, getRouterSpy, getTimeslotServiceSpy} from '../../testing/service-spies';
import {TimeslotService} from '../services/timeslot.service';
import {CompanyBannerComponent} from './company-banner/company-banner.component';

let activatedRouteStub: ActivatedRouteStub;
let companyServiceSpy;
let authServiceSpy;
let routerSpy;
let timeslotServiceSpy;
const expectedCompany = testData().companies[0];
const expectedStudent = testData().student;
const expectedTimeslots = testData().timeslots;

describe('CompanyPage', () => {
  let component: CompanyPage;
  let fixture: ComponentFixture<CompanyPage>;

  beforeEach(async(() => {
    activatedRouteStub = new ActivatedRouteStub({ id: expectedCompany.id.toString(10) });

    companyServiceSpy = getCompanyServiceSpy([expectedCompany]);
    authServiceSpy = getAuthServiceSpy(expectedStudent);
    routerSpy = getRouterSpy();
    timeslotServiceSpy = getTimeslotServiceSpy(expectedTimeslots);

    TestBed.configureTestingModule({
      declarations: [
          CompanyPage,
          CompanyBannerComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: CompanyService, useValue: companyServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: TimeslotService, useValue: timeslotServiceSpy }
      ],
      imports: [
          IonicModule.forRoot(),
          RouterTestingModule,
          HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load company', () => {
    expect(companyServiceSpy.getCompany.calls.count()).toEqual(1);
    expect(companyServiceSpy.getCompany.calls.first().args[0]).toEqual(expectedCompany.id);
    expect(component.company).toEqual(expectedCompany);
  });

  it('should change tab', () => {
    component.changeTab('test');

    expect(routerSpy.navigate.calls.count()).toEqual(1);
    expect(routerSpy.navigate.calls.first().args[0]).toEqual(['/companies/', expectedCompany.id, 'test']);
    expect(component.tab).toEqual('test');
  });
});
