import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginCompanyService {

  private LOGIN = `${environment.api_base}/auth/local`;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any>  {
    const data = {emailaddress: email, password};
    const url = this.LOGIN;

    return this.http.post(url, data);
  }
}
