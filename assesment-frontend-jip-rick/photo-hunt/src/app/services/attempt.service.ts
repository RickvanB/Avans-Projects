import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { Target } from 'src/models/Target';

@Injectable({
  providedIn: 'root'
})
export class AttemptService {

  private POST_ATTEMPT = `${environment.api_url}/attempts`;
  private GET_ATTEMPT = `${environment.api_url}/attempts`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    })
  }

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  newAttempt(target: Target, file: any, id : String) : Observable<any> {
    target.user = this.tokenService.getToken();

    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', target.name);
    formData.append('lat', target.location.coordinates[0]);
    formData.append('long', target.location.coordinates[1]);
    formData.append('user', target.user);

    return this.http.post<any>(this.POST_ATTEMPT + `/${id}`, formData, this.httpOptions);
  }

  getAttempt(id: String) : Observable<any> {
    return this.http.get<any>(this.GET_ATTEMPT + `/${id}`, this.httpOptions);
  }
}
