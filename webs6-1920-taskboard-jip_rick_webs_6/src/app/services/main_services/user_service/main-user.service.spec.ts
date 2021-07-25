import { TestBed } from '@angular/core/testing';

import { MainUserService } from './main-user.service';
import { getUserServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { UserService } from '../../sub_services/users/user.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

let userServiceSpy;

describe('MainUserService', () => {
  let service: MainUserService;

  beforeEach(() => {

    userServiceSpy = getUserServivceServiceSpy(testdata().users);

    TestBed.configureTestingModule({
      providers: [
        { provide: UserService, useValue: userServiceSpy },
      ]
    });
    service = TestBed.get(MainUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should subscribe on users', () => {
    expect(userServiceSpy.subScribeOnUsers()).toEqual(new BehaviorSubject<User[]>(testdata().users));
  });

  it('should return one user', () => {
    expect(userServiceSpy.getUser()).toEqual(new BehaviorSubject<User>(testdata().users[0]));
  });

  it('should return one user by email', () => {
    expect(userServiceSpy.getUserByEmail()).toEqual(new BehaviorSubject<User>(testdata().users[0]));
  });

  it('should return a team', () => {
    expect(userServiceSpy.subScribeOnUsers()).toEqual(new BehaviorSubject<User[]>(testdata().users));
  });
});
