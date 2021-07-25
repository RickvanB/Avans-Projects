import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

let authServiceSpy: { getAccessToken: jasmine.Spy };
let routerSpy: { navigate: jasmine.Spy };
const routerStateSnapshot: any = { snapshot: {}, url: '/test' };
const activatedRouteSnapshot: any = { snapshot: {} };

describe('AuthGuard', () => {
  beforeEach(() => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAccessToken']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [RouterTestingModule]
    });
  });

  it('should return false when user not logged in', inject([AuthGuard], (guard: AuthGuard) => {
    authServiceSpy.getAccessToken.and.returnValue('');

    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toEqual(false);
    expect(routerSpy.navigate.calls.count()).toEqual(1);
    expect(routerSpy.navigate.calls.first().args[0]).toEqual(['/login']);
  }));

  it('should return true when user logged in', inject([AuthGuard], (guard: AuthGuard) => {
    authServiceSpy.getAccessToken.and.returnValue('test access token, doet verder niks');

    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toEqual(true);
    expect(routerSpy.navigate.calls.count()).toEqual(0);
  }));
});
