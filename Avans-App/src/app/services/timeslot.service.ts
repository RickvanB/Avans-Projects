import { Injectable } from '@angular/core';
import { Timeslot } from '../models/timeslot';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {SocketService} from './socket.service';
import Socket = SocketIOClient.Socket;


@Injectable({
  providedIn: 'root'
})
export class TimeslotService {
  private socket: Socket;

  constructor(
    private http: HttpClient,
    private socketService: SocketService
  ) {
    this.socket = socketService.getSocket();
  }

  /**
   * This method will return a list with all timeslots of a company
   */
  getTimeslotsOfCompany(id: number): Observable<Timeslot[]> {
    const url = `${environment.api_base}/companies/${id}/timeslots`;

    return this.http.get<any[]>(url)
        .pipe(
            map(response => {
              return response.map(timeslot => {
                timeslot.startTime = new Date(timeslot.start_time);
                timeslot.endTime = new Date(timeslot.end_time);

                return timeslot;
              });
            })
        );
  }

  getTimeslotsOfStudent(id: number): Observable<Timeslot[]> {
      return this.http.get<any[]>(`${environment.api_base}/students/${id}/timeslots`)
          .pipe(
              map(response => {
                  return response.map(timeslot => {
                      timeslot.startTime = new Date(timeslot.start_time);
                      timeslot.endTime = new Date(timeslot.end_time);

                      return timeslot;
                  });
              })
          );
  }

    /**
     * This method will return a single timeslot
     */
  getTimeslot(timeslotId: number): Observable<Timeslot> {
      return this.http.get<any>(`${environment.api_base}/timeslots/${timeslotId}`)
          .pipe(
              map(response => {
                  response.startTime = new Date(response.start_time);
                  response.endTime = new Date(response.end_time);
                  return response;
              })
          );
  }

  /**
   * This method will update an existing timeslot
   */
  updateTimeslot(timeslot: Timeslot) {
    return this.http.put(`${environment.api_base}/timeslots/${timeslot.id}`, {
        shareCv: timeslot.shareCv,
        enabled: true
    });
  }

/**
 * This method will claim a timeslot for a student
 */
  claimTimeslot(timeslotId: number): Observable<any> {
      return this.http.patch(`${environment.api_base}/timeslots/${timeslotId}`, {
          enroll: true
      });
  }

  /**
   * This method will release an earlier claimed timeslot
   * @param timeslotId id of timeslot
   */
  releaseTimeslot(timeslotId: number): Observable<any> {
    return this.http.patch(`${environment.api_base}/timeslots/${timeslotId}`, {
        enroll: false
    });
  }

  observeTimeslotsByCompany(): Observable<Timeslot> {
      return new Observable<Timeslot>(subscriber => {
          this.socket.on('timeslot_change', data => {
              subscriber.next(data);
          });
      });
  }

  subscribeToCompanyRoom(companyId: number) {
      this.socket.emit('subscribe', {room: `companies/${companyId}`});
  }

  unsubscribeFromCompanyRoom(companyId: number) {
      this.socket.emit('unsubscribe', {room: `companies/${companyId}`});
  }
}
