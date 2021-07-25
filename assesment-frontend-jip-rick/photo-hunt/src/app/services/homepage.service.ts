import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  private GET_HOMEPAGE = `${environment.api_url}/homepage`;
  private headers = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.getToken()}`
  });


  constructor(private http: HttpClient, private tokenService : TokenService) { }

  getHomepage() : Observable<any> {
    return this.http.get(this.GET_HOMEPAGE, { headers: this.headers, responseType: 'text' });
  }

}
