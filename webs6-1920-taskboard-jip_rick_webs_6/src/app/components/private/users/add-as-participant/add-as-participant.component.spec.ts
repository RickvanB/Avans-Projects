import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAsParticipantComponent } from './add-as-participant.component';
import { getUserServivceServiceSpy, getProjectServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { MainUserService } from 'src/app/services/main_services/user_service/main-user.service';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';

let userServiceSpy;
let projectServiceSpy;
let activatedRouteSpy;

describe('AddAsParticipantComponent', () => {
  let component: AddAsParticipantComponent;
  let fixture: ComponentFixture<AddAsParticipantComponent>;

  beforeEach(async(() => {

    userServiceSpy = getUserServivceServiceSpy(testdata().users);
    projectServiceSpy = getProjectServiceSpy(testdata().projects);

    TestBed.configureTestingModule({
      declarations: [ AddAsParticipantComponent ],
      providers: [
        { provide: MainUserService, useValue: userServiceSpy },
        { provide: MainProjectService, useValue: projectServiceSpy },
      ],
      imports: [
          RouterTestingModule,
          FormsModule
      ]
    })
    .compileComponents();

    activatedRouteSpy = spyOnProperty(TestBed.inject(ActivatedRoute), 'paramMap', 'get').and.returnValue(new BehaviorSubject({get(id: string) { return id}}))

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAsParticipantComponent);
    component = fixture.componentInstance;
    component.project = testdata().projects[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
