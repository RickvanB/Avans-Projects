import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CompanyListComponent } from './company-list.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {testData} from '../../../testing/test-data';
import {CompanyService} from '../../services/company.service';
import {getCompanyServiceSpy} from '../../../testing/service-spies';

let companyServiceSpy;
const expectedCompanies = testData().companies;


describe('CompanyListComponent', () => {
  let component: CompanyListComponent;
  let fixture: ComponentFixture<CompanyListComponent>;

  beforeEach(() => {
    companyServiceSpy = getCompanyServiceSpy(expectedCompanies);

    TestBed.configureTestingModule({
      declarations: [ CompanyListComponent ],
      providers: [
        { provide: CompanyService, useValue: companyServiceSpy }
      ],
      imports: [
          IonicModule.forRoot(),
          RouterTestingModule,
          HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load companies', () => {
    component.getCompanies();

    expect(companyServiceSpy.getCompanies.calls.count()).toEqual(1);
    expect(component.companies).toEqual(expectedCompanies);
  });
});
