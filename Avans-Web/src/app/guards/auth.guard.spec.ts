import {inject, TestBed} from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

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
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ],
      imports: [
        RouterTestingModule
      ]
    });
  });

  it('should return false when user not logged in', inject([AuthGuard], (guard: AuthGuard) => {
    authServiceSpy.getAccessToken.and.returnValue('');

    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toEqual(false);
    expect(routerSpy.navigate.calls.count()).toEqual(1);
    expect(routerSpy.navigate.calls.first().args[0]).toEqual(['/login']);
  }));

  it('should return true when user logged in', inject([AuthGuard], (guard: AuthGuard) => {
    // tslint:disable-next-line
    authServiceSpy.getAccessToken.and.returnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoyLCJpZCI6MTAxLCJuYW1lIjoiTWFyayIsImxhc3RuYW1lIjoiR3JvZW5lbmRhYWwiLCJpYXQiOjE1ODY5NjgyOTN9.QR9j8ZsXJ47Yq4Po7YGvrsHt_4eCWK4EeiIAPy0vQ9U');

    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toEqual(true);
    expect(routerSpy.navigate.calls.count()).toEqual(0);
  }));
});
