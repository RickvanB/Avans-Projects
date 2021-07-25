import { Injectable } from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Company } from '../models/company';
import {environment} from '../../environments/environment';
import {CompanyStatus} from '../models/companyStatus.enum';
import {map, switchMap} from 'rxjs/operators';
import {TimeslotService} from './timeslot.service';
import {Contactperson} from '../models/contactperson';
import {AuthService} from './auth.service';
import {Major} from '../models/major';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private COMPANIES = `${environment.api_base}/companies`;

  constructor(
    private http: HttpClient,
    private timeslotService: TimeslotService,
    private authService: AuthService
  ) { }

  /**
   * This method will return a company by id
   */
  getCompany(id: number): Observable<Company> {
    const url = `${this.COMPANIES}/${id}`;
    return this.http.get<Company>(url)
        .pipe(
            switchMap(company => {
                return this.getContacts(company.id).pipe(
                    map(contacts => {
                        company.contacts = contacts.filter(c => c.internshipContact);

                        return company;
                    })
                );
            })
        );
  }

  /**
   * This method will return all companies
   */
  getCompanies(): Observable<Company[]> {
      const student = this.authService.getStudent();
      let majorId = 0;

      if (student.major instanceof Major) {
          majorId = student.major.id;
      }

      // Load companies & append timeslots to the company
      return this.http.get<Company[]>(`${this.COMPANIES}?status=${CompanyStatus.PARTICIPATING}&majorId=${majorId}`)
        .pipe(
            switchMap(companies => {
              return combineLatest(companies.map(company => {
                return this.timeslotService.getTimeslotsOfCompany(company.id).pipe(
                    map(timeslots => {
                      company.timeslots = timeslots;

                      return company;
                    })
                );
              }));
            })
        );
  }

  getContacts(companyId: number): Observable<Contactperson[]> {
      return this.http.get<Contactperson[]>(`${environment.api_base}/companies/${companyId}/contacts`);
  }

  getBanner(companyId: number): Observable<any> {
      const headers = new HttpHeaders();
      headers.append('Accept', 'image/*');

      return this.http.get(`${environment.api_base}/companies/${companyId}/banner`, { headers, responseType: 'blob' });
  }
}
