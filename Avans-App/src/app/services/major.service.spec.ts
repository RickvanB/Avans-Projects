import { TestBed } from '@angular/core/testing';

import { MajorService } from './major.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {testData} from '../../testing/test-data';
import {environment} from '../../environments/environment';

let httpTestingController: HttpTestingController;
let service: MajorService;
const expectedMajors = testData().majors;
const expectedStudent = testData().student;

describe('MajorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(MajorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load majors by education code', () => {
    service.getMajorsByEducation('I-H').subscribe(majors => {
      expect(majors).toEqual(expectedMajors);
    }, error => fail('should not return error'));

    const req = httpTestingController.expectOne(`${environment.api_base}/majors?educationCode=I-H`);

    expect(req.request.method).toEqual('GET');

    req.flush(expectedMajors);
  });

  it('should assign major to student', () => {
    service.assignMajorToStudent(expectedStudent, expectedMajors[0]).subscribe(() => {},
    error => fail('should not return error'));

    const req = httpTestingController.expectOne(`${environment.api_base}/students/${expectedStudent.id}/majors`);

    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual({ majorId: expectedMajors[0].id });

    req.flush({message: 'Klaar'});
  });
});
