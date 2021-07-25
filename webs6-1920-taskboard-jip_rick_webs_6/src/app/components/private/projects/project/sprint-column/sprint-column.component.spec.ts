import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintColumnComponent } from './sprint-column.component';
import { getProjectServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { RouterTestingModule } from '@angular/router/testing';
import { MainProjectService } from 'src/app/services/main_services/project_service/main-project.service';
import { SprintCardComponent } from '../../../sprints/sprint-card/sprint-card.component';

let projectServiceSpy;

describe('SprintColumnComponent', () => {
  let component: SprintColumnComponent;
  let fixture: ComponentFixture<SprintColumnComponent>;

  beforeEach(async(() => {

    projectServiceSpy = getProjectServiceSpy(testdata().projects);

    TestBed.configureTestingModule({
      declarations: [ SprintColumnComponent, SprintCardComponent ],
      providers: [
        { provide: MainProjectService, useValue: projectServiceSpy },
      ],
      imports: [
          RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintColumnComponent);
    component = fixture.componentInstance;
    component.project = testdata().projects[0];
    component.sprints = testdata().sprints;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain projects', () => {
    expect(component.project).toBeTruthy()
  });

  it('should contain sprints', () => {
    expect(component.sprints).toBeTruthy();
  })
});
