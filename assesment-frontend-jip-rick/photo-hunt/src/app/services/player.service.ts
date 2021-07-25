import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private GET_PLAYERS = `${environment.api_url}/users`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    })
  }

  constructor(private http: HttpClient, private tokenService : TokenService) { }

  getPlayers() : Observable<any> {
    return this.http.get<any>(this.GET_PLAYERS, this.httpOptions);
  }

  getPlayer(player_id: string) : Observable<any> {
    return this.http.get<any>(this.GET_PLAYERS + "/" + player_id, this.httpOptions);
  }

  getTargetsFromUser(id : String) : Observable<any> {
    return this.http.get<any>(this.GET_PLAYERS + "/" + id + "/targets", this.httpOptions);
  }

  getAttemptsFromUser(id : String) : Observable<any> {
    return this.http.get<any>(this.GET_PLAYERS + "/" + id + "/attempts", this.httpOptions);
  }
}
