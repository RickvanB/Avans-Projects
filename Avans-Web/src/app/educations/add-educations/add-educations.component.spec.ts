import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationsService} from '../../services/educations.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Observable } from 'rxjs';

import { AddEducationsComponent } from './add-educations.component';

let educationServiceSpy: { addEducation: jasmine.Spy, getEducations: jasmine.Spy };


describe('AddEducationsComponent', () => {
  let component: AddEducationsComponent;
  let fixture: ComponentFixture<AddEducationsComponent>;

  beforeEach(async(() => {

    educationServiceSpy = jasmine.createSpyObj('EducationsService', ['addEducation', 'getEducations']);
    educationServiceSpy.addEducation.and.returnValue(new Observable());
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
        BrowserAnimationsModule
      ], providers: [
        { provide: EducationsService, useValue: educationServiceSpy }
      ],
      declarations: [
        AddEducationsComponent
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEducationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add education', () => {
    const expectedEducation = {name: 'Informatica'};

    component.onSubmit(expectedEducation);

    expect(educationServiceSpy.addEducation.calls.count()).toEqual(1);
    expect(educationServiceSpy.addEducation.calls.first().args[0]).toEqual(expectedEducation);
  });
});
