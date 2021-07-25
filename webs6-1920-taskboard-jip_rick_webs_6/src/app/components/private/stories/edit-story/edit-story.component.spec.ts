import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStoryComponent } from './edit-story.component';
import { getUserStoryServivceServiceSpy, getSprintServiceSpy, getUserServivceServiceSpy, getStoreServivceServiceSpy, getAuthServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { MainSprintService } from 'src/app/services/main_services/sprint_service/main-sprint.service';
import { FormsModule } from '@angular/forms';

let storyServiceSpy;
let sprintServiceSpy;
let userServiceSpy;
let storeServiceSpy;
let authServiceSpy;


describe('EditStoryComponent', () => {
  let component: EditStoryComponent;
  let fixture: ComponentFixture<EditStoryComponent>;

  beforeEach(async(() => {

    storyServiceSpy = getUserStoryServivceServiceSpy(testdata().userstories);
    sprintServiceSpy = getSprintServiceSpy(testdata().sprints);
    userServiceSpy = getUserServivceServiceSpy(testdata().users);
    storeServiceSpy = getStoreServivceServiceSpy(testdata().storeObject);
    authServiceSpy = getAuthServivceServiceSpy(testdata().users[0]);

    TestBed.configureTestingModule({
      declarations: [ EditStoryComponent ],
      providers: [
        { provide: MainSprintService, useValue: sprintServiceSpy },
        { provide: MainUserService, useValue: userServiceSpy },
        { provide: StoreService, useValue: storeServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MainUserstoryService, useValue: storyServiceSpy },
      ],
      imports: [
          RouterTestingModule,
          FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
