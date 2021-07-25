import { TestBed } from '@angular/core/testing';

import { LoginCompanyService } from './login-company.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('LoginCompanyService', () => {
  let service: LoginCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(LoginCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
