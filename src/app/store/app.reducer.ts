import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface AppState {
  loading: boolean;
}

const appInitialState: AppState = {
  loading: false
};

export interface State {
  appState: AppState;
}

export function appReducer(state: AppState = appInitialState, action): AppState {
  switch (action.type) {

    default: {
      return state;
    }
  }
}

export const reducers: ActionReducerMap<State> = {
  appState: appReducer
};

export const getAppState = createFeatureSelector<AppState>('appState');
