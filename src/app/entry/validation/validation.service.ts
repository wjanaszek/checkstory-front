import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, } from '@angular/common/http';
import { config } from '../../config';
import { Observable } from 'rxjs/Observable';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationService {

  constructor(private http: HttpClient) {
  }

  checkLogin(login: string): Observable<boolean> {
    console.log(this.http);
    return this.http.post(config.endpoints.checkLogin, login)
      .pipe(
        switchMap(res => {
          return res ? of(false) : of(true);
        }),
        catchError(err => of(false))
      );
  }

  checkEmail(email: string): Observable<boolean> {
    return this.http.post(config.endpoints.checkEmail, email)
      .pipe(
        switchMap(res => {
          return res ? of(false) : of(true);
        }),
        catchError(err => of(false))
      );
  }

  checkPasswords(ac: AbstractControl): boolean {
    const password = ac.get('password').value;
    const confirmPassword = ac.get('confirmPassword').value;
    if (password !== confirmPassword) {
      ac.get('confirmPassword').setErrors({matchPassword: true});
    } else {
      return null;
    }
  }
}
