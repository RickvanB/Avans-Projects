import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeslotsService {

  private TIMESLOTS = `${environment.api_base}/timeslots`;

  constructor(private http: HttpClient) { }

  lockTimeslot(roundId: number, enabled: boolean, shareCv: boolean): Observable<any> {
    return this.http.put(`${this.TIMESLOTS}/${roundId}`, { enabled, shareCv});
  }
}
