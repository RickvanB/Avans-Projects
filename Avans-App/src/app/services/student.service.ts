import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  /**
   * This method will return a student with a specified id (If exists)
   * @param identifier Id of the student to search
   */
  getStudent(identifier: number): Observable<Student> {
    return this.http.get<Student>(`${environment.api_base}/students/${identifier}`);
  }

  /**
   * This method will patch the about me of a student
   * @param student Student model
   */
  patchStudent(student: Student): Observable<any> {
    if (student != null) {
      return this.http.patch(`${environment.api_base}/students/${student.id}`, {
        aboutMe: student.aboutMe
      });
    }
  }

  /**
   * This method will upload a new CV
   * @param student Student model
   */
  patchStudentCV(student: Student, formdata: FormData): Observable<any> {
    if (student != null) {
      return this.http.patch(`${environment.api_base}/students/${student.id}/cv`, formdata);
    }
  }
}
