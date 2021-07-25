import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsColumnComponent } from './participants-column.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { StoreService } from 'src/app/services/main_services/store_service/store.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { testdata } from 'src/app/testing/test-data';
import { getUserServivceServiceSpy, getStoreServivceServiceSpy, getProjectServiceSpy } from 'src/app/testing/service-spies';
import { UserCardComponent } from '../../../users/user-card/user-card.component';

let userServiceSpy;
let storeServiceSpy;
let projectService;

describe('ParticipantsColumnComponent', () => {
  let component: ParticipantsColumnComponent;
  let fixture: ComponentFixture<ParticipantsColumnComponent>;

  beforeEach(async(() => {

    userServiceSpy = getUserServivceServiceSpy(testdata().users);
    storeServiceSpy = getStoreServivceServiceSpy(testdata().storeObject);
    projectService = getProjectServiceSpy(testdata().projects);

    TestBed.configureTestingModule({
      declarations: [ ParticipantsColumnComponent, UserCardComponent ],
      providers: [
        { provide: MainUserService, useValue: userServiceSpy },
        { provide: StoreService, useValue: storeServiceSpy },
        { provide: MainProjectService, useValue: projectService },
      ],
      imports: [
        RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsColumnComponent);
    component = fixture.componentInstance;
    component.project = testdata().projects[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain participants', () => {
    expect(component.participants).toBeDefined();
  });

  it('should contain project', () => {
    expect(component.project).toBeTruthy();
  });
});
