import { TestBed } from '@angular/core/testing';

import { MainProjectService } from './main-project.service';
import { getSubProjectServivceServiceSpy, getUserServivceServiceSpy } from 'src/app/testing/service-spies';
import { testdata } from 'src/app/testing/test-data';
import { ProjectService } from '../../sub_services/project/project.service';
import { MainUserService } from '../user_service/main-user.service';
import { BehaviorSubject } from 'rxjs';
import { Project } from 'src/app/models/project';

let projectServiceSpy;
let userSerivceSpy;

describe('MainProjectService', () => {
  let service: MainProjectService;

  beforeEach(() => {

    projectServiceSpy = getSubProjectServivceServiceSpy(testdata().projects);
    userSerivceSpy = getUserServivceServiceSpy(testdata().users);

    TestBed.configureTestingModule({
      providers: [
        { provide: ProjectService, useValue: projectServiceSpy },
        { provide: MainUserService, useValue: userSerivceSpy },
      ]
    });
    service = TestBed.inject(MainProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return specific project', () => {
    expect(projectServiceSpy.getProject()).toEqual(new BehaviorSubject<Project>(testdata().projects[0]));
  });

  it('should subscribe on projects', () => {
    expect(projectServiceSpy.subscribeOnProjects()).toEqual(new BehaviorSubject<Project[]>(testdata().projects));
  });
});
