
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthCompanyAdminGuard } from './auth-company-admin.guard';
import { RouterTestingModule } from '@angular/router/testing';


describe('AuthCompanyAdminGuard', () => {
  let authServiceSpy: { getAccessToken: jasmine.Spy };
  let routerSpy: { navigate: jasmine.Spy };
  const routerStateSnapshot: any = { snapshot: {}, url: '/test' };
  const activatedRouteSnapshot: any = { snapshot: {} };

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

  it('should return false when user not logged in', inject([AuthCompanyAdminGuard], (guard: AuthCompanyAdminGuard) => {
    authServiceSpy.getAccessToken.and.returnValue('');

    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toEqual(false);
    expect(routerSpy.navigate.calls.count()).toEqual(1);
    expect(routerSpy.navigate.calls.first().args[0]).toEqual(['/login']);
  }));

  it('should return true when user logged in', inject([AuthCompanyAdminGuard], (guard: AuthCompanyAdminGuard) => {
    /* tslint:disable */
    authServiceSpy.getAccessToken.and.returnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoxLCJpZCI6MSwibmFtZSI6IlhhbmRvciIsImxhc3RuYW1lIjoiSmFuc3NlbiIsIm1ham9yIjpudWxsLCJjb21wYW55SWQiOjEsImlhdCI6MTU4Njk3MDg2Mn0.FCK72-kKmLqSVGkJqzrFEVjELvYZNduydpnep3mtLmE');
    /* tslint:enable */
    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toEqual(true);
    expect(routerSpy.navigate.calls.count()).toEqual(0);
  }));
});
