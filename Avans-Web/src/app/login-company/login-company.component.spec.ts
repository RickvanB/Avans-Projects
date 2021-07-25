import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginCompanyComponent } from './login-company.component';
import { LoginCompanyService } from '../services/login-company.service';
import { getCompanyLoginServiceSpy } from '../../testing/serviceSpies';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginCompanyComponent', () => {
  let component: LoginCompanyComponent;
  let fixture: ComponentFixture<LoginCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginCompanyComponent ]
      ,
      imports: [
        MatSnackBarModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: LoginCompanyService, useValue: getCompanyLoginServiceSpy()}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
