import { TestBed } from '@angular/core/testing';

import { TimeslotsService } from './timeslots.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

let httpTestingController: HttpTestingController;

describe('TimeslotsService', () => {
  let service: TimeslotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.inject(TimeslotsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
