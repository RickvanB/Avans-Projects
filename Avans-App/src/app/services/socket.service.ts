import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';
import Socket = SocketIOClient.Socket;

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;

  constructor(
      private authService: AuthService
  ) {}

  getSocket(): Socket {
    if (!this.socket) {
      this.socket = io(environment.websocket_url, {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: 'Bearer ' + this.authService.getAccessToken()
            }
          }
        }
      });
    }

    return this.socket;
  }
}
