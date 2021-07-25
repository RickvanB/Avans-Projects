import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Major} from '../models/major';
import {environment} from '../../environments/environment';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class MajorService {

  constructor(
      private http: HttpClient
  ) { }

  getMajors(): Observable<Major[]> {
    return this.http.get<Major[]>(`${environment.api_base}/majors`);
  }

  getMajorsByEducation(educationCode: string): Observable<Major[]> {
    return this.http.get<Major[]>(`${environment.api_base}/majors?educationCode=${educationCode}`);
  }

  assignMajorToStudent(student: Student, major: Major): Observable<any> {
    return this.http.patch(`${environment.api_base}/students/${student.id}/majors`, {
      majorId: major.id
    });
  }
}
