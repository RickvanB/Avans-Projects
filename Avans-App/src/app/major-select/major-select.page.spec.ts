import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MajorSelectPage } from './major-select.page';
import {getAuthServiceSpy, getMajorServiceSpy} from '../../testing/service-spies';
import {testData} from '../../testing/test-data';
import {MajorService} from '../services/major.service';
import {AuthService} from '../services/auth.service';
import {RouterTestingModule} from '@angular/router/testing';
import {Major} from '../models/major';

let majorServiceSpy;
let authServiceSpy;
const expectedMajors = testData().majors;
const expectedStudent = testData().student;

describe('MajorSelectPage', () => {
  let component: MajorSelectPage;
  let fixture: ComponentFixture<MajorSelectPage>;

  beforeEach(async(() => {
    majorServiceSpy = getMajorServiceSpy(expectedMajors);
    authServiceSpy = getAuthServiceSpy(expectedStudent);

    TestBed.configureTestingModule({
      declarations: [ MajorSelectPage ],
      imports: [
          IonicModule.forRoot(),
          RouterTestingModule
      ],
      providers: [
        { provide: MajorService, useValue: majorServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MajorSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load majors for student education', () => {
    if (expectedStudent.major instanceof Major) {
      expect(component.majors).toEqual(majorServiceSpy.getMajorsByEducation(expectedStudent.major.educationCode));
    } else {
      expect(component.majors).toEqual(majorServiceSpy.getMajorsByEducation(expectedStudent.major));
    }
  });

  it('should assign major to student', () => {
    component.selectMajor(expectedMajors[0]);

    expect(majorServiceSpy.assignMajorToStudent.calls.count()).toEqual(1);
    expect(majorServiceSpy.assignMajorToStudent.calls.first().args[0]).toEqual(expectedStudent);
    expect(majorServiceSpy.assignMajorToStudent.calls.first().args[1]).toEqual(expectedMajors[0]);
  });
});
