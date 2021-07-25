import { TestBed } from '@angular/core/testing';

import { BurnDownService } from './burn-down.service';
import { getSubProjectServivceServiceSpy, getSubUserStoryServivceServiceSpy, getUserStoryServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { ProjectService } from '../../sub_services/project/project.service';
import { UserStoryService } from '../../sub_services/user_story/user-story.service';
import { MainProjectService } from '../project_service/main-project.service';
import { MainUserstoryService } from '../userstory_service/main-userstory.service';

let projectServiceSpy;
let storyServiceSpy;

describe('BurnDownService', () => {
  let service: BurnDownService;

  beforeEach(() => {

    projectServiceSpy = getSubProjectServivceServiceSpy(testdata().projects);
    storyServiceSpy = getUserStoryServivceServiceSpy(testdata().userstories);

    TestBed.configureTestingModule({
      providers: [
        { provide: MainProjectService, useValue: projectServiceSpy },
        { provide: MainUserstoryService, useValue: storyServiceSpy },
      ]
    });
    service = TestBed.inject(BurnDownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
