import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCompanyComponent } from './dashboard-company.component';

import { CompaniesService } from '../../services/companies.service';
import { AuthService } from '../../services/auth.service';
import { getCompanyServiceSpy, getAuthServiceSpy } from '../../../testing/serviceSpies';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


describe('DashboardCompanyComponent', () => {
  let component: DashboardCompanyComponent;
  let fixture: ComponentFixture<DashboardCompanyComponent>;

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      declarations: [ DashboardCompanyComponent ],
      providers: [
        { provide: CompaniesService, useValue: getCompanyServiceSpy() },
        { provide: AuthService, useValue: getAuthServiceSpy() }
      ],
      imports: [MatDialogModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
