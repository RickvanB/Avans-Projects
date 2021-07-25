import { Injectable } from '@angular/core';
import {Student} from '../models/student';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Major} from '../models/major';

const accessTokenKey = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
      private http: HttpClient
  ) { }

  getAccessToken(): string {
    return localStorage.getItem(accessTokenKey);
  }

  setAccessToken(token: string) {
    localStorage.setItem(accessTokenKey, token);
  }

  removeAccessToken() {
    localStorage.removeItem(accessTokenKey);
  }

  refreshStudentToken(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.get<{ access_token: string }>(`${environment.api_base}/auth/avans/refresh`).subscribe(response => {
        this.setAccessToken(response.access_token);

        resolve();
      }, error => reject(error));
    });
  }

  refreshEmployeeToken(majorId: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.post<{ access_token: string }>(`${environment.api_base}/auth/avans/refreshadmin`, { majorId }).subscribe(response => {
        this.setAccessToken(response.access_token);

        resolve();
      }, error => reject(error));
    });
  }

  getStudent(): Student {
    const jwt = this.getAccessToken();
    if (!jwt) {
      return null;
    }

    const parts = jwt.split('.');

    if (parts.length !== 3) {
      return null;
    }

    let payload;

    try {
      payload = JSON.parse(atob(parts[1]));
    } catch (e) {
      return null;
    }

    const student = new Student();

    let major: string | Major;

    if (!payload.major) {
      major = '';
    } else if (typeof payload.major === 'string') {
      major = payload.major;
    } else {
      major = new Major();
      Object.assign(major, payload.major);
    }

    student.id = payload.id;
    student.avansId = payload.avansId;
    student.name = payload.name;
    student.lastName = payload.lastname;
    student.major = major;
    student.type = payload.type;

    return student;
  }
}
