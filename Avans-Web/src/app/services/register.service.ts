import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private COMPANIES = `${environment.api_base}/companies`;

  constructor(private http: HttpClient) { }

  /**
   * This method will add a new company
   */
  addCompany(company: any): Observable<any> {
    const url = this.COMPANIES;
    return this.http.put(url, company);
  }
}
