import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';

let httpTestingController: HttpTestingController;

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(RegisterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should post company data', ()  => {
    service.addCompany({name: 'Avans'}).subscribe(data => {

    }, error => fail('Should not return error'));

    const req = httpTestingController.expectOne(`${environment.api_base}/companies`);

    expect(req.request.method).toEqual('PUT');
  });
});
