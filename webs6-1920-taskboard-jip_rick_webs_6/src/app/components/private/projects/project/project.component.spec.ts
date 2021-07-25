import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { UserStoryService } from 'src/app/services/sub_services/user_story/user-story.service';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { RouterTestingModule } from '@angular/router/testing';
import { testdata } from 'src/app/testing/test-data';
import { getProjectServiceSpy, getStoreServivceServiceSpy, getUserStoryServivceServiceSpy, getUserServivceServiceSpy } from 'src/app/testing/service-spies';
import { SprintCardComponent } from '../../sprints/sprint-card/sprint-card.component';
import { SprintColumnComponent } from './sprint-column/sprint-column.component';
import { ParticipantsColumnComponent } from './participants-column/participants-column.component';
import { BacklogColumnComponent } from './backlog-column/backlog-column.component';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';

let projectServiceSpy;
let storeServiceSpy;
let storyServiceSpy; 
let userServiceSpy;

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    projectServiceSpy = getProjectServiceSpy(testdata().projects);
    storeServiceSpy = getStoreServivceServiceSpy(testdata().storeObject);
    storyServiceSpy = getUserStoryServivceServiceSpy(testdata().userstories);
    userServiceSpy = getUserServivceServiceSpy(testdata().users);

    TestBed.configureTestingModule({
      declarations: [ ProjectComponent, SprintCardComponent, BacklogColumnComponent, SprintColumnComponent, ParticipantsColumnComponent ],
      providers: [
        {provide: StoreService, useValue: storeServiceSpy},
        {provide: MainUserstoryService, useValue: storyServiceSpy},
        {provide: MainProjectService, useValue: projectServiceSpy},
        {provide: MainUserService, useValue: userServiceSpy},
      ],
      imports : [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    component.project = testdata().projects[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change View should change View Boolean', () => {
    let curstate = component.showAsTable;
    component.changeView();

    if(curstate){
      expect(component.showAsTable).toBeFalse()
    } else{
      expect(component.showAsTable).toBeTrue()
    }
  })

});
