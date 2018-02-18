import { EntryState } from './entry/entry.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';

export interface State extends fromRoot.State {
  entry: EntryState;
}

export const getEntryState = createFeatureSelector<EntryState>('entry');

export const getLoginError = createSelector(
  getEntryState,
  state => state.loginError
);

export const getRegisterError = createSelector(
  getEntryState,
  state => state.registerError
);
