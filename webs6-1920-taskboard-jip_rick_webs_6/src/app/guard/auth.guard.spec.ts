import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { getAuthServivceServiceSpy } from '../testing/service-spies';
import { testdata } from '../testing/test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth/auth.service';

let authSpy;


describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {

    authSpy = getAuthServivceServiceSpy(testdata().users[0]);

    TestBed.configureTestingModule({     
      providers: [
      {provide: AuthService, useValue: authSpy},
    ],
    imports : [
      RouterTestingModule
    ]});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
