import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { getAuthServivceServiceSpy, getUserStoryServivceServiceSpy, getSprintServiceSpy, getUserServivceServiceSpy, getProjectServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from './../../../../testing/test-data'
import { ArchivedProjectsComponent } from './archived-projects.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { auth } from 'firebase';

let userServiceSpy;
let authServiceSpy;
let projectServiceSpy;

describe('ArchivedProjectsComponent', () => {
  let component: ArchivedProjectsComponent;
  let fixture: ComponentFixture<ArchivedProjectsComponent>;

  beforeEach(async(() => {

    userServiceSpy = getUserServivceServiceSpy(testdata().users);
    authServiceSpy = getAuthServivceServiceSpy(testdata().users[0]);
    projectServiceSpy = getProjectServiceSpy(testdata().projects);

    TestBed.configureTestingModule({
      declarations: [ ArchivedProjectsComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: MainUserService, useValue: userServiceSpy},
        {provide: MainProjectService, useValue: projectServiceSpy},
      ],
      imports : [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain projects', () => {
    // One archived project found
    expect(component.myProjects.length).toEqual(1);
  });

  it('should deArchive Project', () =>{
    expect(component.deArchive(testdata().projects[0]))
  })
});
