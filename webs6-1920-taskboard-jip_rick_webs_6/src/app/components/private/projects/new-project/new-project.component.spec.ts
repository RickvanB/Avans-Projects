import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectComponent } from './new-project.component';
import { testdata } from 'src/app/testing/test-data';
import { getAuthServivceServiceSpy, getProjectServiceSpy } from 'src/app/testing/service-spies';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { FormsModule } from '@angular/forms';

let projectServiceSpy;
let authServiceSpy;

describe('NewProjectComponent', () => {
  let component: NewProjectComponent;
  let fixture: ComponentFixture<NewProjectComponent>;

  beforeEach(async(() => {
    authServiceSpy = getAuthServivceServiceSpy(testdata().users[0]);
    projectServiceSpy = getProjectServiceSpy(testdata().projects);

    TestBed.configureTestingModule({
      declarations: [ NewProjectComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MainProjectService, useValue: projectServiceSpy },
      ],
      imports: [
        RouterTestingModule,
        FormsModule
    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on select status should change status', () =>{ 
    component.onSelectStatus("2");

    expect(component.project.status).toEqual("2");
  })
});
