import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStoryComponent } from './new-story.component';
import { getAuthServivceServiceSpy, getUserStoryServivceServiceSpy, getSprintServiceSpy, getStoreServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from './../../../../testing/test-data'
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { MainSprintService } from 'src/app/services/main_services/sprint_service/main-sprint.service';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { FormsModule } from '@angular/forms';

let AuthServiceSpy;
let storyServiceSpy;
let sprintServiceSpy;
let routeSpy;
let storeServiceSpy;

describe('NewStoryComponent', () => {
  let component: NewStoryComponent;
  let fixture: ComponentFixture<NewStoryComponent>;

  beforeEach(async(() => {

    AuthServiceSpy = getAuthServivceServiceSpy(testdata().users[0]);
    storyServiceSpy = getUserStoryServivceServiceSpy(testdata().userstories);
    sprintServiceSpy = getSprintServiceSpy(testdata().sprints);
    storeServiceSpy = getStoreServivceServiceSpy(testdata().storeObject);
    
    TestBed.configureTestingModule({
      declarations: [ NewStoryComponent ],
      providers: [
        {provide: AuthService, useValue: AuthServiceSpy},
        {provide: MainUserstoryService, useValue: storyServiceSpy},
        {provide: MainSprintService, useValue: sprintServiceSpy},
        {provide: StoreService, useValue: storeServiceSpy},
      ],
      imports : [
        RouterTestingModule,
        FormsModule
      ]
    })
    .compileComponents();

    routeSpy = spyOnProperty(TestBed.inject(ActivatedRoute), 'paramMap', 'get').and.returnValue(new BehaviorSubject({get(id: string) { return id}}))

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
