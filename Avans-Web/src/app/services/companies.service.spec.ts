import { TestBed } from '@angular/core/testing';

import { CompaniesService } from './companies.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

let httpTestingController: HttpTestingController;

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CompaniesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return companies', () => {
    service.getTimeSlotsByCompany(1, false).subscribe(data => {
    }, error => fail('Should not return error'));

    const req = httpTestingController.expectOne(`${environment.api_base}/companies/1/timeslots`);

    expect(req.request.method).toEqual('GET');
  });
});
