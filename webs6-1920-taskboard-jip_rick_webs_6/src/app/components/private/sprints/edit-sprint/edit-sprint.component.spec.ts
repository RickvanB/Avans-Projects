import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSprintComponent } from './edit-sprint.component';
import { getSprintServiceSpy, getUserStoryServivceServiceSpy, getStoreServivceServiceSpy, getProjectServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { MainSprintService } from 'src/app/services/main_services/sprint_service/main-sprint.service';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

let sprintServiceSpy;
let userStoryServiceSpy;
let storeServiceSpy;
let projectServiceSpy;
let routeSpy;

describe('EditSprintComponent', () => {
  let component: EditSprintComponent;
  let fixture: ComponentFixture<EditSprintComponent>;

  beforeEach(async(() => {

    sprintServiceSpy = getSprintServiceSpy(testdata().sprints);
    userStoryServiceSpy = getUserStoryServivceServiceSpy(testdata().userstories);
    storeServiceSpy = getStoreServivceServiceSpy(testdata().storeObject);
    projectServiceSpy = getProjectServiceSpy(testdata().projects);

    TestBed.configureTestingModule({
      declarations: [ EditSprintComponent ],
      providers: [
        { provide: MainSprintService, useValue: sprintServiceSpy },
        { provide: MainUserstoryService, useValue: userStoryServiceSpy },
        { provide: StoreService, useValue: storeServiceSpy },
        { provide: MainProjectService, useValue: projectServiceSpy },
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
    fixture = TestBed.createComponent(EditSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
