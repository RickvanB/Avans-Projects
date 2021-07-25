import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

let service: AuthService;

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.removeItem('access_token');

    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.get(AuthService);
  });

  it('should be created', done => {
    expect(service).toBeTruthy();
    done();
  });

  it('should not return access token when not loggedin', done => {
    expect(service.getAccessToken()).toBeNull();
    done();
  });

  it('should return access token when loggedin', done => {
    localStorage.setItem('access_token', 'test');

    expect(service.getAccessToken()).toBe('test');

    localStorage.removeItem('access_token');
    done();
  });

  it('should store access token in localstorage', done => {
    service.setAccessToken('test1');

    expect(localStorage.getItem('access_token')).toBe('test1');

    localStorage.removeItem('access_token');

    done();
  });

  it('should remove access token from localstorage', done => {
    localStorage.setItem('access_token', 'test2');

    service.removeAccessToken();

    expect(localStorage.getItem('access_token')).toBeNull();

    done();
  });

  it('should return null as student when access token not set', done => {
    expect(service.getStudent()).toBeNull();
    done();
  });

  it('should return null as student when jwt has invalid syntax', done => {
    localStorage.setItem('access_token', 'header.payload');

    expect(service.getStudent()).toBeNull();

    localStorage.removeItem('access_token');
    done();
  });

  it('should return student when jwt is set', done => {
    // tslint:disable-next-line:max-line-length
    localStorage.setItem('access_token', 'header.eyJ0eXBlIjowLCJpZCI6MTAyLCJuYW1lIjoiRGFhbiIsImxhc3RuYW1lIjoidmFuIEJlcmtlbCIsIm1ham9yIjoiSS1IIiwiY29tcGFueUlkIjpudWxsLCJpYXQiOjE1ODcwMjg4OTd9.encrypted');

    const student = service.getStudent();

    expect(student).toBeTruthy();
    expect(student.id).toEqual(102);
    expect(student.name).toEqual('Daan');
    expect(student.lastName).toEqual('van Berkel');

    localStorage.removeItem('access_token');

    done();
  });

  it('should return null as student when jwt payload contains invalid JSON', done => {
    localStorage.setItem('access_token', 'header.SU5WQUxJRA==.encrypted');

    expect(service.getStudent()).toBeNull();

    localStorage.removeItem('access_token');

    done();
  });
});
