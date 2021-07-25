import { TestBed } from '@angular/core/testing';

import { CompanyMajorService } from './company-major.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CompanyMajorService', () => {
  let service: CompanyMajorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CompanyMajorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
