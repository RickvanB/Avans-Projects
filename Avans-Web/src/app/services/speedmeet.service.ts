import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeedmeetService {

  private SPEEDMEET = `${environment.api_base}/speedmeet`;
  private EDUCATIONS = `${environment.api_base}/educations`;
  private ROUNDS = `${environment.api_base}/rounds`;

  constructor(private http: HttpClient) { }

  getSpeedmeet(): Observable<any> {
    return this.http.get(this.SPEEDMEET);
  }

  getEducations(): Observable<any> {
    return this.http.get(this.EDUCATIONS);
  }

  getRounds(): Observable<any> {
    return this.http.get(this.ROUNDS);
  }

  addRound(timestart: string, timeend: string): Observable<any> {
    return this.http.post(this.ROUNDS, {timestart, timeend});
  }

  editRound(id: number, timestart: string, timeend: string): Observable<any> {
    return this.http.put(`${this.ROUNDS}/${id}`, {timestart, timeend});
  }

  deleteRound(id: number): Observable<any> {
    return this.http.delete(`${this.ROUNDS}/${id}`);
  }
}
