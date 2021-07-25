import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {combineLatest, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import { CompanyStatus } from '../enum/company-status';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  private COMPANIES = `${environment.api_base}/companies`;

  constructor(private http: HttpClient) { }

  getTimeSlotsByCompany(id: number, withLocked: boolean): Observable<any> {
    let url = `${this.COMPANIES}/${id}/timeslots`;
    if (withLocked) {
      url = `${this.COMPANIES}/${id}/timeslots?withLocked=${withLocked}`;
    }

    return this.http.get(url);
  }

  getTimeSlots(): Observable<any> {
    const url = this.COMPANIES;
    return this.http.get<any[]>(url + `?status=${CompanyStatus.PARTICIPATING}`)
      .pipe(
        switchMap(companies => {
          return combineLatest(companies.map(company => {
            return this.getTimeSlotsByCompany(company.id, false).pipe(
              map(timeslots => {
                company.timeslots = timeslots;

                return company;
              })
            );
          }));
        })
      );
  }

  getAllCompanies(): Observable<any> {
    const url = this.COMPANIES;
    return this.http.get<any>(url);
  }

  deleteCompanyById(id: any) {
    const url = this.COMPANIES + '/' + id;
    return this.http.delete(url);
  }

  getCompanyById(id: any) {
    const url = this.COMPANIES + '/' + id;
    return this.http.get(url);
  }

  getCompanyMajorById(id: any) {
    const url = this.COMPANIES + '/' + id + '/majors';
    return this.http.get(url);
  }

  getCompanyContactById(id: any) {
    const url = this.COMPANIES + '/' + id + '/contacts';
    return this.http.get(url);
  }

  updateCompany(value: any, id: any) {
    const url = this.COMPANIES + '/' + id;
    return this.http.put(url, value);
  }

  patchEducations(model: any, companyId: number) {
    const url = this.COMPANIES + '/' + companyId + '/majors';
    return this.http.patch(url, model) as any;
  }
}
