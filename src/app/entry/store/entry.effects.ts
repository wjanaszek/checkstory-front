import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { EntryActions } from './entry.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { config } from '../../config';
import { of } from 'rxjs/observable/of';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { Md5 } from 'ts-md5/dist/md5';
import LoginPayload = EntryActions.LoginPayload;
import RegisterPayload = EntryActions.RegisterPayload;
import { ErrorResponse } from '../../shared/models/error-response.model';

@Injectable()
export class EntryEffects {

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(EntryActions.types.login)
    .pipe(
      map((action: EntryActions.Login) => action.payload),
      switchMap((payload: LoginPayload) => {
        const loginPayload = {...payload, password: Md5.hashStr(payload.password)};
        return this.http.post(config.endpoints.login, loginPayload, { observe: 'response' })
          .pipe(
            map((res: any) => new EntryActions.LoginSuccess(res)),
            catchError((err: ErrorResponse) => of(new EntryActions.LoginFail(err)))
          );
      })
    );

  @Effect()
  loginSuccess$: Observable<Action> = this.actions$
    .ofType(EntryActions.types.loginSuccess)
    .pipe(
      map((action: EntryActions.LoginSuccess) => action.payload),
      switchMap(payload => {
        localStorage.setItem('jwt-token', payload.headers.get('Authorization').slice(7));
        this.router.navigateByUrl('home');
        return new EmptyObservable();
      })
    );

  @Effect()
  register$: Observable<Action> = this.actions$
    .ofType(EntryActions.types.register)
    .pipe(
      map((action: EntryActions.Register) => action.payload),
      switchMap((payload: RegisterPayload) => {
        const registerPayload = {...payload, password: Md5.hashStr(payload.password)};
        return this.http.post(config.endpoints.createUser, registerPayload)
          .pipe(
            map(res => new EntryActions.RegisterSuccess()),
            catchError(err => of(new EntryActions.RegisterFail(err)))
          );
      })
    );

  @Effect()
  registerSuccess$: Observable<Action> = this.actions$
    .ofType(EntryActions.types.registerSuccess)
    .pipe(
      switchMap(() => {
        this.router.navigateByUrl('entry/login');
        return new EmptyObservable();
      })
    );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {
  }

}
