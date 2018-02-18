import { EntryActions } from './entry.actions';

export interface EntryState {
  isLoggedIn: boolean;
  loginError: string;
  registerError: string;
}

const initialState: EntryState = {
  isLoggedIn: false,
  loginError: null,
  registerError: null,
};

export function entryReducer(state: EntryState = initialState, action: any): EntryState {
  switch (action.type) {

    case EntryActions.types.login: {
      return {...state, loginError: null};
    }

    case EntryActions.types.loginFail: {
      return {...state, loginError: 'Invalid login or password'};
    }

    case EntryActions.types.loginSuccess: {
      return {...state, isLoggedIn: true};
    }

    case EntryActions.types.register: {
      return {...state, registerError: null};
    }

    case EntryActions.types.registerFail: {
      return {...state, registerError: 'Something went wrong. Please contact us'};
    }

    default: {
      return state;
    }
  }
}
