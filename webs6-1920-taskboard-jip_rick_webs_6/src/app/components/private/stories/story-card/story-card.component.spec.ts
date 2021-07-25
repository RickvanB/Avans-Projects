import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCardComponent } from './story-card.component';
import { getUserServivceServiceSpy, getStoreServivceServiceSpy, getUserStoryServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';

let userServiceSpy;
let storeServiceSpy;
let userStoryServiceSpy;

describe('StoryCardComponent', () => {
  let component: StoryCardComponent;
  let fixture: ComponentFixture<StoryCardComponent>;

  beforeEach(async(() => {

    userServiceSpy = getUserServivceServiceSpy(testdata().users);
    storeServiceSpy = getStoreServivceServiceSpy(testdata().storeObject);
    userStoryServiceSpy = getUserStoryServivceServiceSpy(testdata().userstories);

    TestBed.configureTestingModule({
      declarations: [ StoryCardComponent ],
      providers: [
        { provide: MainUserService, useValue: userServiceSpy },
        { provide: StoreService, useValue: storeServiceSpy },
        { provide: MainUserstoryService, useValue: userStoryServiceSpy },
      ],
      imports: [
          RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCardComponent);
    component = fixture.componentInstance;
    component.data = testdata().userstories[0];
    component.projectId = testdata().projects[0].id;
    component.minimalize = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
