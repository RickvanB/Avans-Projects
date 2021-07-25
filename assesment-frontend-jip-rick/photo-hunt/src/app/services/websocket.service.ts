import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket;
  private SERVER_URL = environment.api_url;

  constructor() { }

  public initSocket() : void {
    this.socket = socketIo(this.SERVER_URL);
  }

  public send(type : any, message : any) : void {
    this.socket.emit(type, message);
  }

  public onMessage(type: any) : Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(type, (data: any) => observer.next(data));
    });
  }

  public onEvent(event: Event) : Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next())
    });
  }

 
}
