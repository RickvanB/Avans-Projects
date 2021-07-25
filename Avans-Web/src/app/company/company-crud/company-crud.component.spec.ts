import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCrudComponent } from './company-crud.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {getCompanyServiceSpy} from '../../../testing/serviceSpies';
import {CompaniesService} from '../../services/companies.service';

let companiesServiceSpy;

describe('CompanyCrudComponent', () => {
  let component: CompanyCrudComponent;
  let fixture: ComponentFixture<CompanyCrudComponent>;

  beforeEach(async(() => {
    companiesServiceSpy = getCompanyServiceSpy();

    TestBed.configureTestingModule({
      declarations: [ CompanyCrudComponent ],
      providers: [
        { provide: CompaniesService, useValue: companiesServiceSpy }
      ],
      imports: [
        MatDialogModule,
        MatSnackBarModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
