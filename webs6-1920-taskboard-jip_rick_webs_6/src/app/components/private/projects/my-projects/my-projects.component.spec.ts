import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectsComponent } from './my-projects.component';
import { getProjectServiceSpy, getAuthServivceServiceSpy, getUserServivceServiceSpy, getStoreServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { By } from '@angular/platform-browser';
import { DetailsOfProjectComponent } from '../details-of-project/details-of-project.component';

let projectServiceSpy;
let authServiceSpy;
let userServiceSpy;
let storeServiceSpy;

describe('MyProjectsComponent', () => {
  let component: MyProjectsComponent;
  let fixture: ComponentFixture<MyProjectsComponent>;

  beforeEach(async(() => {

    projectServiceSpy = getProjectServiceSpy(testdata().projects);
    authServiceSpy = getAuthServivceServiceSpy(testdata().users[0]);
    userServiceSpy = getUserServivceServiceSpy(testdata().users);
    storeServiceSpy = getStoreServivceServiceSpy(testdata().storeObject);

    TestBed.configureTestingModule({
      declarations: [ MyProjectsComponent, DetailsOfProjectComponent ],
      providers: [
        { provide: MainProjectService, useValue: projectServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MainUserService, useValue: userServiceSpy },
        { provide: StoreService, useValue: storeServiceSpy },
      ],
      imports: [
          RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain projects', () => {
    // One archived project found
    expect(component.myProjects.length).toEqual(2);
  });

  it('details should be set', () =>{
    component.getDetails(testdata().projects[0].id)
    expect(component.project.id).toEqual(testdata().projects[0].id)
  })

  it('change View should change View Boolean', () => {
    let curstate = component.showAsTable;
    component.changeView();

    if(curstate){
      expect(component.showAsTable).toBeFalse()
    } else{
      expect(component.showAsTable).toBeTrue()
    }
  })

  it('should contain 2 projects', () => {
    const projects = fixture.debugElement.query(By.css('.projects')).nativeElement;
    // 2 projects and 2 project buttons
    expect(projects.children.length).toEqual(4)
  })
});
