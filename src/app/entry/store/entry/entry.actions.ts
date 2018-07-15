import { Action } from '@ngrx/store';

export namespace EntryActions {
  export const types = {
    login: '[Entry] Login user',
    loginFail: '[Entry] Login user fail',
    loginSuccess: '[Entry] Login user success',
    register: '[Entry] Register user',
    registerFail: '[Entry] Register user fail',
    registerSuccess: '[Entry] Register user success',
  };

  /**
   * Login actions
   */
  export interface LoginPayload {
    login: string;
    password: string;
  }

  export class Login implements Action {
    type = types.login;

    constructor(public payload: LoginPayload) {
    }
  }

  export class LoginFail implements Action {
    type = types.loginFail;

    constructor(public payload: any) {
    }
  }

  export class LoginSuccess implements Action {
    type = types.loginSuccess;

    constructor(public payload: any) {
    }
  }

  /**
   * Register actions
   */
  export interface RegisterPayload {
    login: string;
    email: string;
    password: string;
  }

  export class Register implements Action {
    type = types.register;

    constructor(public payload: RegisterPayload) {
    }
  }

  export class RegisterFail implements Action {
    type = types.registerFail;

    constructor(public payload: any) {
    }
  }

  export class RegisterSuccess implements Action {
    type = types.registerSuccess;

    constructor() {
    }
  }
}
