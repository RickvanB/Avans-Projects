import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompanyDetailComponent } from './company-detail.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRouteStub} from '../../../testing/activated-route-stub';
import {testData} from '../../../testing/test-data';
import {BehaviorSubject} from 'rxjs';
import {Company} from '../../models/company';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from '../../services/company.service';
import { AuthService } from 'src/app/services/auth.service';

let activatedRouteStub: ActivatedRouteStub;
let companyServiceSpy: { getCompany: jasmine.Spy };
let authServiceSpy: {
  getStudent: jasmine.Spy,
  getAccessToken: jasmine.Spy
};

const expectedCompany = testData().companies[0];
const expectedStudent = testData().student;

describe('CompanyDetailComponent', () => {
  let component: CompanyDetailComponent;
  let fixture: ComponentFixture<CompanyDetailComponent>;

  beforeEach((() => {
    activatedRouteStub = new ActivatedRouteStub({ id: expectedCompany.id });

    companyServiceSpy = jasmine.createSpyObj('CompanyService', ['getCompany']);
    companyServiceSpy.getCompany.and.returnValue(new BehaviorSubject<Company>(expectedCompany));
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getStudent', 'getAccessToken']);
    authServiceSpy.getStudent.and.returnValue(expectedStudent);
    authServiceSpy.getAccessToken.and.returnValue('');

    TestBed.configureTestingModule({
      declarations: [ CompanyDetailComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: CompanyService, useValue: companyServiceSpy }
      ],
      imports: [
          IonicModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load right company', () => {
    expect(companyServiceSpy.getCompany.calls.count()).toEqual(1);
    expect(companyServiceSpy.getCompany.calls.first().args[0]).toEqual(expectedCompany.id);
    expect(component.company).toEqual(expectedCompany);
  });
});
