import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterService } from '../services/register.service';
import { Observable } from 'rxjs';

let registerServiceSpy: { addCompany: jasmine.Spy };

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    registerServiceSpy = jasmine.createSpyObj('RegisterService', ['addCompany']);
    registerServiceSpy.addCompany.and.returnValue(new Observable());

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: RegisterService, useValue: registerServiceSpy }
      ],
      declarations: [
        RegisterComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add company', () => {
    const expectedCompany = {name: 'Avans'};

    component.onSubmit(expectedCompany);

    expect(registerServiceSpy.addCompany.calls.count()).toEqual(1);
    expect(registerServiceSpy.addCompany.calls.first().args[0]).toEqual(expectedCompany);
  });
});
