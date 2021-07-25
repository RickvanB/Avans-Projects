import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationsService {

  private EDUCATIONS = `${environment.api_base}/majors`;

  constructor(private http: HttpClient) { }

  getEducations(): Observable<any> {
    const url = this.EDUCATIONS;
    return this.http.get(url);
  }

  addEducation(education: any): Observable<any> {
    const url = this.EDUCATIONS;
    return this.http.post(url, education);
  }

  deleteEducation(id: number): Observable<any> {
    const url = `${environment.api_base}/majors/${id}`;
    return this.http.delete(url);
  }

  updateEducation(education: any): Observable<any> {
    console.log(education);
    const url = `${environment.api_base}/majors/${education.id}`;
    return this.http.put(url, education);
  }
}
