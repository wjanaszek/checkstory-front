import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { config } from '../../config';
import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AbstractControl } from '@angular/forms';
import { AsyncValidationPayload } from '../../shared/interfaces/async-validation-payload.interface';

@Injectable()
export class ValidationService {

  constructor(private http: HttpClient) {
  }

  emailAvailable(email: string): Observable<boolean> {
    return this.http.get(config.endpoints.checkEmail, {
      params: {
        email: email
      }
    })
      .pipe(
        map((res: AsyncValidationPayload) => res.result === 'false'),
        catchError(err => of(false))
      );
  }

  usernameAvailable(login: string): Observable<boolean> {
    return this.http.get(config.endpoints.checkLogin, {
      params: {
        username: login
      }
    })
      .pipe(
        map((res: AsyncValidationPayload) => res.result === 'false'),
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
