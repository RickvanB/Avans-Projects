import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTableComponent } from './project-table.component';
import { testdata } from 'src/app/testing/test-data';
import { getUserStoryServivceServiceSpy } from 'src/app/testing/service-spies';
import { MainUserstoryService } from 'src/app/services/main_services/userstory_service/main-userstory.service';
import { of } from 'rxjs';


let storySpy;

describe('ProjectTableComponent', () => {
  let component: ProjectTableComponent;
  let fixture: ComponentFixture<ProjectTableComponent>;

  beforeEach(async(() => {

    storySpy = getUserStoryServivceServiceSpy(testdata().userstories);

    TestBed.configureTestingModule({
      declarations: [ ProjectTableComponent ],
      providers: [
        {provide: MainUserstoryService, useValue: storySpy},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTableComponent);
    component = fixture.componentInstance;
    component.userstories = of(testdata().userstories);
    component.sprints = testdata().sprints;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TODO: 'Cannot find a differ supporting object '[object Object]' of type 'object'. NgFor only supports binding to Iterables such as Arrays.'
  // it('should contain stories', () => {
  //   expect(component.userstories).toBeDefined();
  // });

  // it('should contain sprints', () => {
  //   expect(component.sprints).toBeDefined();
  // });
});
