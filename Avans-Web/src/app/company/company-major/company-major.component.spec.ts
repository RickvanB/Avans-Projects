import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMajorComponent } from './company-major.component';
import { Observable } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { getCompanyServiceSpy, getEducationServiceSpy } from '../../../testing/serviceSpies';
import { CompaniesService } from '../../services/companies.service';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EducationsService } from 'src/app/services/educations.service';
import { MatDialogModule } from '@angular/material/dialog';

let activatedRouteStub: ActivatedRouteStub;

describe('CompanyMajorComponent', () => {
  let component: CompanyMajorComponent;
  let fixture: ComponentFixture<CompanyMajorComponent>;

  beforeEach(async(() => {

    activatedRouteStub = new ActivatedRouteStub({id: 1});

    TestBed.configureTestingModule({
      declarations: [ CompanyMajorComponent ],
      providers: [
        { provide: EducationsService, useValue: getEducationServiceSpy() },
        { provide: CompaniesService, useValue: getCompanyServiceSpy() },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ],
      imports: [
        MatSnackBarModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatDialogModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
