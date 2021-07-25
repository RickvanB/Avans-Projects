import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSprintComponent } from './add-sprint.component';
import { getSprintServiceSpy, getAuthServivceServiceSpy, getProjectServiceSpy, getUserStoryServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { userstoryValidator } from 'src/app/validators/userstoryValidator';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainSprintService } from 'src/app/services/main_services/sprint_service/main-sprint.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

let AuthServiceSpy;
let routeSpy;
let sprintServiceSpy;
let projectServiceSpy;
let userStoryServiceSpy;

describe('AddSprintComponent', () => {
  let component: AddSprintComponent;
  let fixture: ComponentFixture<AddSprintComponent>;

  beforeEach(async(() => {

    AuthServiceSpy = getAuthServivceServiceSpy(testdata().users[0]);
    sprintServiceSpy = getSprintServiceSpy(testdata().sprints);
    projectServiceSpy = getProjectServiceSpy(testdata().projects);
    userStoryServiceSpy = getUserStoryServivceServiceSpy(testdata().userstories);

    TestBed.configureTestingModule({
      declarations: [ AddSprintComponent ],
      providers: [
        { provide: AuthService, useValue: AuthServiceSpy },
        { provide: MainSprintService, useValue: sprintServiceSpy },
        { provide: MainProjectService, useValue: projectServiceSpy },
        { provide: MainUserstoryService, useValue: userStoryServiceSpy },
      ],
      imports: [
          RouterTestingModule,
          FormsModule
      ]
    })
    .compileComponents();

    routeSpy = spyOnProperty(TestBed.inject(ActivatedRoute), 'paramMap', 'get').and.returnValue(new BehaviorSubject({get(id: string) { return id}}))

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
