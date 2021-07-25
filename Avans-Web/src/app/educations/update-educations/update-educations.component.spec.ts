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

import { UpdateEducationsComponent } from './update-educations.component';


let educationServiceSpy: { updateEducation: jasmine.Spy, getEducations: jasmine.Spy };

describe('UpdateEducationsComponent', () => {
  let component: UpdateEducationsComponent;
  let fixture: ComponentFixture<UpdateEducationsComponent>;

  beforeEach(async(() => {

    educationServiceSpy = jasmine.createSpyObj('EducationsService', ['updateEducation', 'getEducations']);
    educationServiceSpy.updateEducation.and.returnValue(new Observable());
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
      declarations: [ UpdateEducationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEducationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should update education', () => {
  //   const expectedEducation = {name: 'Informatica'};

  //   component.onSubmit(expectedEducation);

  //   expect(educationServiceSpy.updateEducation.calls.count()).toEqual(1);
  //   expect(educationServiceSpy.updateEducation.calls.first().args[0]).toEqual(expectedEducation);
  // });
});
