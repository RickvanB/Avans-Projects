import { TestBed } from '@angular/core/testing';

import { MainSprintService } from './main-sprint.service';
import { getSubSprintServivceServiceSpy, getUserStoryServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { SprintService } from '../../sub_services/sprint/sprint.service';
import { MainProjectService } from '../project_service/main-project.service';
import { MainUserstoryService } from '../userstory_service/main-userstory.service';
import { BehaviorSubject } from 'rxjs';
import { Sprint } from 'src/app/models/sprint';


let sprintServiceSpy;
let userStoryServiceSpy;


describe('MainSprintService', () => {
  let service: MainSprintService;

  beforeEach(() => {

    sprintServiceSpy = getSubSprintServivceServiceSpy(testdata().sprints);
    userStoryServiceSpy = getUserStoryServivceServiceSpy(testdata().userstories);

    TestBed.configureTestingModule({
      providers: [
        { provide: SprintService, useValue: sprintServiceSpy },
        { provide: MainUserstoryService, useValue: userStoryServiceSpy },
        MainSprintService
      ]
    });
    service = TestBed.get(MainSprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return one sprint', () => {
    expect(sprintServiceSpy.getSprint()).toEqual(new BehaviorSubject<Sprint>(testdata().sprints[0]));
  });

  it('should return all sprints', () => {
    expect(sprintServiceSpy.getAllSprints()).toEqual(new BehaviorSubject<Sprint[]>(testdata().sprints));
  });
});
