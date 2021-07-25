import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

let authServiceSpy: { getAccessToken: jasmine.Spy };

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAccessToken']);
    authServiceSpy.getAccessToken.and.returnValue('testtoken');

    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should return to home when user already loggedin', () => {
  //   expect(routerSpy.navigate.calls.count()).toEqual(1);
  // });
});
