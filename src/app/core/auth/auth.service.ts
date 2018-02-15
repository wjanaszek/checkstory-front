import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    if (localStorage.getItem('jwt-token')) {
      return true;
    } else {
      return false;
    }
  }

}
