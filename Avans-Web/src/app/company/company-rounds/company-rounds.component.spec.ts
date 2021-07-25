import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesService } from '../../services/companies.service';
import { TimeslotsService } from '../../services/timeslots.service';
import { SpeedmeetService } from '../../services/speedmeet.service';

import { RouterTestingModule } from '@angular/router/testing';

import { getCompanyServiceSpy, getSpeedmeetServiceSpy, getTimeslotServiceSpy } from '../../../testing/serviceSpies';

import { CompanyRoundsComponent } from './company-rounds.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('CompanyRoundsComponent', () => {
  let component: CompanyRoundsComponent;
  let fixture: ComponentFixture<CompanyRoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRoundsComponent ],
      providers: [
        { provide: CompaniesService, useValue: getCompanyServiceSpy() },
        { provide: SpeedmeetService, useValue: getSpeedmeetServiceSpy() },
        { provide: TimeslotsService, useValue: getTimeslotServiceSpy() }
      ],
      imports: [RouterTestingModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
