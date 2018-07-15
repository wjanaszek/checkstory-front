import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  constructor() {
  }

  isLoggedIn(): boolean {
    return !!(this.getToken() && tokenNotExpired(null, this.getToken()));
  }

  getToken(): string {
    return localStorage.getItem('jwt-token');
  }

}
