import { Injectable } from '@angular/core';

const accessTokenKey = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAccessToken(): string {
    return localStorage.getItem(accessTokenKey);
  }

  setAccessToken(token: string) {
    localStorage.setItem(accessTokenKey, token);
  }

  removeAccessToken() {
    localStorage.removeItem(accessTokenKey);
  }
}
