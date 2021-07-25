import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationsService} from '../../services/educations.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { OverviewEducationsComponent } from './overview-educations.component';

let educationServiceSpy: { getEducations: jasmine.Spy };

describe('OverviewEducationsComponent', () => {
  let component: OverviewEducationsComponent;
  let fixture: ComponentFixture<OverviewEducationsComponent>;



  beforeEach(async(() => {

    educationServiceSpy = jasmine.createSpyObj('EducationsService', ['getEducations']);
    educationServiceSpy.getEducations.and.returnValue(new Observable());

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule
      ],
      providers: [
        { provide: EducationsService, useValue: educationServiceSpy }
      ],
      declarations: [ OverviewEducationsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewEducationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
