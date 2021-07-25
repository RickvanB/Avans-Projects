import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Speedmeet} from '../models/speedmeet';
import {environment} from '../../environments/environment';
import {SocketService} from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class SpeedmeetService {

  constructor(
      private http: HttpClient,
      private socketService: SocketService
  ) { }

  getLatestSpeedmeet(): Observable<Speedmeet> {
    return this.http.get<Speedmeet>(`${environment.api_base}/speedmeet`);
  }

  observeSpeedmeet(): Observable<Speedmeet> {
    return new Observable<Speedmeet>(subscriber => {
      this.socketService.getSocket().on('speedmeet_change', speedmeet => {
        subscriber.next(speedmeet);
      });
    });
  }

  getSpeedmeetMap(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'image/*');

    return this.http.get(`${environment.api_base}/speedmeet/map`, {headers, responseType: 'blob'});
  }
}
