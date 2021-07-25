import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogColumnComponent } from './backlog-column.component';
import { getUserStoryServivceServiceSpy, getStoreServivceServiceSpy, getUserServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { StoryCardComponent } from '../../../stories/story-card/story-card.component';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { RouterTestingModule } from '@angular/router/testing';

let userStoryServiceSpy;
let userServiceSpy;
let storeserviceSpy;

describe('BacklogColumnComponent', () => {
  let component: BacklogColumnComponent;
  let fixture: ComponentFixture<BacklogColumnComponent>;

  beforeEach(async(() => {

    userStoryServiceSpy = getUserStoryServivceServiceSpy(testdata().userstories);
    storeserviceSpy = getStoreServivceServiceSpy(testdata().storeObject);
    userServiceSpy = getUserServivceServiceSpy(testdata().users);

    TestBed.configureTestingModule({
      declarations: [ BacklogColumnComponent, StoryCardComponent ],
      providers: [
        { provide: MainUserstoryService, useValue: userStoryServiceSpy },
        { provide: MainUserService, useValue: userServiceSpy },
        { provide: StoreService, useValue: storeserviceSpy }
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacklogColumnComponent);
    component = fixture.componentInstance;
    component.project = testdata().projects[0]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain stories', () => {
    expect(component.stories).toBeDefined();
  });

  it('should contain project', () => {
    expect(component.project).toBeTruthy();
  });
});
