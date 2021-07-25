import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment} from '../../environments/environment';
import { Target } from 'src/models/Target';
import { User } from 'src/models/User';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Review } from 'src/models/Review';
import { Pagination } from 'src/models/pagination';

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  private GET_TARGETS = `${environment.api_url}/targets`;
  private GET_ATTEMPTS_TARGET = `${environment.api_url}/attempts/target`;
  private GET_USER_TARGET = `${environment.api_url}/users/`;
  private DELETE_TARGET = `${environment.api_url}/targets/`;
  private POST_TARGET = `${environment.api_url}/targets`;
  private NEARBY_TARGET = `${environment.api_url}/targets/nearby/`;
  private POST_REVIEW = `${environment.api_url}/targets/`;


  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    })
  };

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getTargts(limit: Number, page: Number, sort : any) : Observable<Pagination> {
    if(page == null) {
      page = 1;
    }

    if(limit == null) {
      limit = 10;
    }

    if(sort != null) {
      return this.http.get<Pagination>(this.GET_TARGETS + "?sort=" + sort, this.httpOptions);
    }
    
    return this.http.get<Pagination>(this.GET_TARGETS + "?page=" + page + "&limit=" + limit, this.httpOptions);
  }

  removeTarget(id: string) : Observable<string> {
    return this.http.delete<string>(this.DELETE_TARGET + id, this.httpOptions);
  }

  getUserFromTarget(id: string): Observable<User>{
    return this.http.get<User>(this.GET_USER_TARGET + id, this.httpOptions);
  }

  newTarget(target: Target, file: any) : Observable<any> {
    target.user = this.tokenService.getToken();
    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', target.name);
    formData.append('lat', target.location.coordinates[0]);
    formData.append('long', target.location.coordinates[1]);
    formData.append('user', target.user);

    return this.http.post<any>(this.POST_TARGET, formData, this.httpOptions);
  }

  getTargetsWithinRang(range: Number, lat: string, long: string): Observable<Target[]>{
    return this.http.get<Target[]>(this.NEARBY_TARGET + lat + "/" + long + "/" + range, this.httpOptions);
  }

  addNewReview(isThumpsUp: Boolean, target_id: string): Observable<any> {
    return this.http.post<any>(this.POST_REVIEW + target_id + "/review/" + isThumpsUp, {}, this.httpOptions);
  }

  getPhotosFromAttemptsTarget(target_id : String, attempt_id: String) : Observable<any> {
    return this.http.get<any>(this.GET_TARGETS + "/" + target_id + "/attempts/" + attempt_id + "/photos", this.httpOptions);
  }

  getTarget(id: String) : Observable<Target> {
    return this.http.get<Target>(this.GET_TARGETS + "/" + id, this.httpOptions);
  }

  getAttemptsForTarget(id : String) : Observable<any> {
    return this.http.get<any>(this.GET_ATTEMPTS_TARGET + "/" + id, this.httpOptions);
  }
}
