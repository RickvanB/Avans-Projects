import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallbackComponent } from './callback.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRouteStub} from '../../testing/activated-route-stub';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

let activatedRouteStub: ActivatedRouteStub;
let authServiceSpy: { setAccessToken: jasmine.Spy };
let routerSpy: { navigate: jasmine.Spy };

describe('CallbackComponent', () => {
  let component: CallbackComponent;
  let fixture: ComponentFixture<CallbackComponent>;

  beforeEach(async(() => {
    activatedRouteStub = new ActivatedRouteStub({ access_token: 'testtoken' });
    authServiceSpy = jasmine.createSpyObj('AuthService', ['setAccessToken']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [
        CallbackComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home when access token in querystring', () => {
    expect(authServiceSpy.setAccessToken.calls.count()).toEqual(1);
    expect(authServiceSpy.setAccessToken.calls.first().args[0]).toEqual('testtoken');
    expect(routerSpy.navigate.calls.count()).toEqual(1);
    expect(routerSpy.navigate.calls.first().args[0]).toEqual(['/admin-dashboard']);
  });
});
