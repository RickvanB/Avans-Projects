import { TestBed, async, inject } from '@angular/core/testing';

import { MajorGuard } from './major.guard';
import {testData} from '../../testing/test-data';
import {getAuthServiceSpy} from '../../testing/service-spies';
import {AuthService} from '../services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';

let authServiceSpy;
let routerSpy: { navigate: jasmine.Spy };
const routerStateSnapshot: any = { snapshot: {}, url: '/test' };
const activatedRouteSnapshot: any = { snapshot: {} };
const expectedStudent = testData().student;

describe('MajorGuard', () => {
  beforeEach(() => {
    authServiceSpy = getAuthServiceSpy(expectedStudent);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        MajorGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [
          RouterTestingModule
      ]
    });
  });

  it('should create MajorGuard', inject([MajorGuard], (guard: MajorGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return true when student has already selected a major', inject([MajorGuard], (guard: MajorGuard) => {
    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toEqual(true);
    expect(routerSpy.navigate.calls.count()).toEqual(0);
  }));

  it ('should return false when student must select a major', inject([MajorGuard], (guard: MajorGuard) => {
    const student = testData().student;
    student.major = 'I-H';
    authServiceSpy.getStudent.and.returnValue(student);

    expect(guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)).toEqual(false);
    expect(routerSpy.navigate.calls.count()).toEqual(1);
    expect(routerSpy.navigate.calls.first().args[0]).toEqual(['/major-select']);
  }));
});
