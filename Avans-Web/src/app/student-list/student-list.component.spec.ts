import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListComponent } from './student-list.component';
import { Observable } from 'rxjs';
import { CompaniesService } from 'src/app/services/companies.service';
import { SpeedmeetService } from 'src/app/services/speedmeet.service';
import {getCompanyServiceSpy, getSpeedmeetServiceSpy} from '../../testing/serviceSpies';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentListComponent ],
      providers: [
        { provide: CompaniesService, useValue: getCompanyServiceSpy() },
        { provide: SpeedmeetService, useValue: getSpeedmeetServiceSpy() }
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
