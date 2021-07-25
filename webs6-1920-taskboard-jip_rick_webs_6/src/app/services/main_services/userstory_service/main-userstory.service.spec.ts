import { TestBed } from '@angular/core/testing';

import { MainUserstoryService } from './main-userstory.service';
import { getUserStoryServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { UserStoryService } from '../../sub_services/user_story/user-story.service';
import { BehaviorSubject } from 'rxjs';
import { UserStory } from 'src/app/models/userStory';

let userStoryServiceSpy;

describe('MainUserstoryService', () => {
  let service: MainUserstoryService;

  beforeEach(() => {

    userStoryServiceSpy = getUserStoryServivceServiceSpy(testdata().userstories);

    TestBed.configureTestingModule({
      providers: [
        { provide: UserStoryService, useValue: userStoryServiceSpy },
      ]
    });
    service = TestBed.inject(MainUserstoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return userstory', () => {
    expect(userStoryServiceSpy.getUserStory()).toEqual(new BehaviorSubject<UserStory>(testdata().userstories[1]));
  });
});
