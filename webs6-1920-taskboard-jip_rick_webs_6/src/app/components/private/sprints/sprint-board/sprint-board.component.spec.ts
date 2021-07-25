import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintBoardComponent } from './sprint-board.component';
import { getUserStoryServivceServiceSpy, getProjectServiceSpy, getUserServivceServiceSpy, getStoreServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { SprintBurndownComponent } from '../sprint-burndown/sprint-burndown.component';
import { StoryCardComponent } from '../../stories/story-card/story-card.component';

let storyServiceSpy;
let projectServiceSpy;
let userServiceSpy;
let storeServiceSpy;

describe('SprintBoardComponent', () => {
  let component: SprintBoardComponent;
  let fixture: ComponentFixture<SprintBoardComponent>;

  beforeEach(async(() => {

    storyServiceSpy = getUserStoryServivceServiceSpy(testdata().userstories);
    projectServiceSpy = getProjectServiceSpy(testdata().projects);
    userServiceSpy = getUserServivceServiceSpy(testdata().users);
    storeServiceSpy = getStoreServivceServiceSpy(testdata().storeObject);

    TestBed.configureTestingModule({
      declarations: [ SprintBoardComponent, SprintBurndownComponent, StoryCardComponent ],
      providers: [
        { provide: MainUserstoryService, useValue: storyServiceSpy },
        { provide: MainProjectService, useValue: projectServiceSpy },
        { provide: MainUserService, useValue: userServiceSpy },
        { provide: StoreService, useValue: storeServiceSpy },
      ],
      imports: [
          RouterTestingModule,
          DragDropModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
