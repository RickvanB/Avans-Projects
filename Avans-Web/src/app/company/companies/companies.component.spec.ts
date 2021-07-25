import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesComponent } from './companies.component';
import { CompaniesService } from '../../services/companies.service';
import { EducationsService } from 'src/app/services/educations.service';
import { SpeedmeetService } from '../../services/speedmeet.service';
import { getCompanyServiceSpy, getSpeedmeetServiceSpy, getEducationServiceSpy } from '../../../testing/serviceSpies';
import { MatTableModule } from '@angular/material/table';

describe('CompaniesComponent', () => {
  let component: CompaniesComponent;
  let fixture: ComponentFixture<CompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesComponent ],
      providers: [
        { provide: CompaniesService, useValue: getCompanyServiceSpy() },
        { provide: SpeedmeetService, useValue: getSpeedmeetServiceSpy() },
        { provide: EducationsService, useValue: getEducationServiceSpy() }
      ],
      imports: [
        MatTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
