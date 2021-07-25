import { TestBed } from '@angular/core/testing';

import { CompanyService } from './company.service';
import {HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {testData} from '../../testing/test-data';
import {CompanyStatus} from '../models/companyStatus.enum';
import {getAuthServiceSpy} from '../../testing/service-spies';
import {AuthService} from './auth.service';
import {Major} from '../models/major';

let httpTestingController: HttpTestingController;
let service: CompanyService;
let authServiceSpy;
const expectedCompanies = testData().companies;
const expectedStudent = testData().student;

describe('CompanyService', () => {
  beforeEach(() => {
    authServiceSpy = getAuthServiceSpy(expectedStudent);

    TestBed.configureTestingModule({
      providers: [
        CompanyService,
        { provide: AuthService, useValue: authServiceSpy }
      ],
      imports: [
          HttpClientTestingModule
      ]
    });

    service = TestBed.get(CompanyService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected companies', () => {
    service.getCompanies().subscribe(companies => {
      expect(companies).toEqual(expectedCompanies);
    });

    let majorId = 0;

    if (expectedStudent.major instanceof Major) {
      majorId = expectedStudent.major.id;
    }

    let req = httpTestingController.expectOne(`${environment.api_base}/companies?status=${CompanyStatus.PARTICIPATING}&majorId=${majorId}`);

    expect(req.request.method).toEqual('GET');

    req.flush(expectedCompanies);

    for (const company of expectedCompanies) {
      req = httpTestingController.expectOne(`${environment.api_base}/companies/${company.id}/timeslots`);

      expect(req.request.method).toEqual('GET');

      req.flush(company.timeslots);
    }
  });

  it('should return single company', () => {
    service.getCompany(1).subscribe(company => {
      expect(company).toEqual(expectedCompanies[0]);
    });

    let req = httpTestingController.expectOne(`${environment.api_base}/companies/1`);

    expect(req.request.method).toEqual('GET');

    req.flush(expectedCompanies[0]);

    req = httpTestingController.expectOne(`${environment.api_base}/companies/1/contacts`);

    expect(req.request.method).toEqual('GET');

    req.flush(expectedCompanies[0].contacts);
  });

  it('should return error when company not found', () => {
    const errorMessage = 'company not found';

    service.getCompany(1).subscribe(
      company => fail('should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(errorMessage, 'message');
        }
    );

    const req = httpTestingController.expectOne(`${environment.api_base}/companies/1`);

    expect(req.request.method).toEqual('GET');

    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
