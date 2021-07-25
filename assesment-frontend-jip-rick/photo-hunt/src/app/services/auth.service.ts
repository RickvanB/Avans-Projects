import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment} from '../../environments/environment';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private GET_SIGN_IN = `${environment.api_url}/auth/google`;

  constructor(private http: HttpClient, private tokenSerivce: TokenService, ) { }

  singOut() : void {
    this.tokenSerivce.saveToken("");
    this.user.next(null);
  }

  /**
   * This method will check if a user is still signed in
   */
  checkToken(): void {
    var token = this.tokenSerivce.getToken();
    if(token != null && token != ""){
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      const isExpired = helper.isTokenExpired(token);

      if(!isExpired){
        this.user.next({ name: decodedToken.name, id: decodedToken._id});
      }
    }
  }
}
