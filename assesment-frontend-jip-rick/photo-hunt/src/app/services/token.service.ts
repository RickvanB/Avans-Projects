import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = "AUTH_TOKEN";

  constructor() { }

  /**
   * This method will save a token
   * @param token 
   */
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * This method will get a token
   */
  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
