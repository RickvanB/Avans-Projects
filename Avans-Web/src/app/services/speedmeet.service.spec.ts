import { TestBed } from '@angular/core/testing';

import { SpeedmeetService } from './speedmeet.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import {environment} from '../../environments/environment';

let httpTestingController: HttpTestingController;

describe('SpeedmeetService', () => {
  let service: SpeedmeetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(SpeedmeetService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return latest speedmeet data', ()  => {
    service.getSpeedmeet().subscribe(data => {

    }, error => fail('Should not return error'));

    const req = httpTestingController.expectOne(`${environment.api_base}/speedmeet`);

    expect(req.request.method).toEqual('GET');
  });
});
